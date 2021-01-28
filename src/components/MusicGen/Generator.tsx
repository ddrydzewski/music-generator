import { GenButton, LoadingText } from "./style";
import { useState } from "react";
import * as React from "react";
import * as tf from "@tensorflow/tfjs";
import { initTexts } from "../../files/startText";
import { chars } from "../../files/charsData";
//import Loader from "react-loader-spinner";

export const Generator = () => {
  const [musicLenght] = useState(450);
  const [maxlen] = useState(60);
  const [enableGen, setEnableGen] = useState(true);
  const [disabledDownload, setDisabledDownload] = useState(true);

  let startText: string = "";
  let TextFromClient: string = "";

  const sample = (probs: any, temperature: number) => {
    return tf.tidy(() => {
      const logits: any = tf.div(tf.log(probs), Math.max(temperature, 1e-6));
      const isNormalized = false;
      return tf.multinomial(logits, 1, undefined, isNormalized).dataSync()[0];
    });
  };

  const initStartText = () => {
    console.log("Init");
    const startIndex = getRandomInt(0, initTexts.startText.length - maxlen - 1);
    startText = initTexts.startText.slice(startIndex, startIndex + maxlen);
    TextFromClient = startText;
  };

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const predict = async () => {
    console.log("Start predict");
    const model = await tf.loadLayersModel("http://localhost:8080/model.json");
    if (model) {
      let i = 0;
      for (let index = 0; index < musicLenght; index++) {
        const sampled = new tf.TensorBuffer(
          [1, maxlen, chars.length],
          "float32"
        );
        for (let char of startText) {
          sampled.set(1, 0, i, chars.indexOf(char));
          i++;
        }
        i = 0;
        const input = sampled.toTensor();
        const preds = await model.predict(input);
        const nextIndex = sample(preds, 1.0);
        const nextChar = chars[nextIndex];

        startText += nextChar;
        startText = startText.slice(1);
        TextFromClient += nextChar;
      }
      console.log("EndOfPrecict");
      console.log(TextFromClient);
    }
  };

  const handleGenButton = async () => {
    setEnableGen(false);
    initStartText();
    predict().then(postDataToApi).then(afterPostData);
  };

  const handleDownloadButton = async () => {
    getDataFromApi();
  };

  const afterPostData = () => {
    console.log("OK");
    setEnableGen(true);
    setDisabledDownload(false);
  };

  const postDataToApi = async () => {
    if (TextFromClient !== null && TextFromClient !== undefined) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ TextFromClient }),
      };
      await fetch("https://localhost:44305/api/values", requestOptions);
    }
  };

  const getDataFromApi = async () => {
    setTimeout(() => {
      const response = {
        file: "https://localhost:44305/api/values",
      };
      window.open(response.file);
    }, 100);
  };

  return (
    <div>
      {enableGen ? (
        <>
          <GenButton onClick={handleGenButton}>Generate music</GenButton>
          <GenButton disabled={disabledDownload} onClick={handleDownloadButton}>
            Download
          </GenButton>
        </>
      ) : (
        <LoadingText>Generating music... Please wait</LoadingText>
      )}
    </div>
  );
};
