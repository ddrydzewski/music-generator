import { initTexts } from "../files/startText";
import { settings } from "../config/musicSettings";
import { getRandomInt } from "./randomInt";

export const initStartText = () => {
  let startText: string;
  const startIndex = getRandomInt(
    0,
    initTexts.startText.length - settings.maxlen - 1
  );
  startText = initTexts.startText.slice(
    startIndex,
    startIndex + settings.maxlen
  );
  return startText;
};
