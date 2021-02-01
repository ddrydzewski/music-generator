import * as tf from "@tensorflow/tfjs";
import { chars } from "../files/charsData";
import { sample } from "./getSample";
import { settings } from "../config/musicSettings";

export async function predict(startText: string) : Promise<string> {
  let TextFromClient: string = startText;
  const model = await tf.loadLayersModel("lstm/model.json");
  if (model) {
    let i = 0;
    for (let index = 0; index < settings.musicLenght; index++) {
      const sampled = new tf.TensorBuffer(
        [1, settings.maxlen, chars.length],
        "float32"
      );
      for (let char of startText) {
        sampled.set(1, 0, i, chars.indexOf(char));
        i++;
      }
      i = 0;
      const input = sampled.toTensor();
      const preds = await model.predict(input);
      const nextIndex = sample(preds, 0.8);
      const nextChar = chars[nextIndex];

      startText += nextChar;
      startText = startText.slice(1);
      TextFromClient += nextChar;
    }
  }
  return TextFromClient.toString();
};
