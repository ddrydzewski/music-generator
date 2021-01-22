import { GenButton } from "./style";
import { useState } from "react";
import * as React from "react";
import * as tf from "@tensorflow/tfjs";
import { BodyText } from "precise-ui";
import { initTexts } from "../../files/startText";
import { chars } from "../../files/charsData";

export const Generator = () => {
  const [musicLenght] = useState(250);
  const [maxlen] = useState(60);

  let preds: any;
  let nextIndex: number;
  let nextChar: string;
  let startText: string = "";

  const sample = (probs: any, temperature: number) => {
    return tf.tidy(() => {
      const logits: any = tf.div(tf.log(probs), Math.max(temperature, 1e-6));
      const isNormalized = false;
      return tf.multinomial(logits, 1, undefined, isNormalized).dataSync()[0];
    });
  };

  const initStartText = () => {
    const startIndex =
      Math.floor(Math.random() * (initTexts.startText.length - maxlen)) + 1;
    startText = initTexts.startText.slice(startIndex, startIndex + maxlen);
    console.log(startText.length);
    console.log(startText);
  };

  const predict = async () => {
    initStartText();
    console.log(startText + "tako w srodku");
    const model = await tf.loadLayersModel("http://localhost:8080/model.json");
    if (model) {
      for (let index = 0; index < musicLenght; index++) {
        const sampled = new tf.TensorBuffer(
          [1, maxlen, chars.length],
          "float32"
        );
        for (let i = 0; i < maxlen; i++) {
          for (let char of startText) {
            sampled.set(1, 0, i, chars.indexOf(char));
          }
        }
        const input = sampled.toTensor();
        preds = (await model).predict(input);
        nextIndex = sample(preds, 1.0);
        nextChar = chars[nextIndex];

        startText += nextChar;
        console.log(nextChar);
      }
      console.log(startText.toString());
    }
  };

  const handleGenButton = () => {
    predict();
  };

  const hangleGenText = () => {
    return startText;
  }

  return (
    <div>
      <GenButton onClick={handleGenButton}>Generate music</GenButton>
      <BodyText> Wygenerowany tekst muzyka</BodyText>
      <text onChange={hangleGenText}>{startText}</text>
      <GenButton>Download</GenButton>
    </div>
  );
};