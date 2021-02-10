import { settings } from "../config/musicSettings";

export const setProgress = (index: number) => {
  const progress = Math.round((index / settings.musicLenght) * 100);
};
