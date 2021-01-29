import * as tf from "@tensorflow/tfjs";

export const sample = (probs: any, temperature: number) => {
  return tf.tidy(() => {
    const logits: any = tf.div(tf.log(probs), Math.max(temperature, 1e-6));
    const isNormalized = false;
    return tf.multinomial(logits, 1, undefined, isNormalized).dataSync()[0];
  });
};
