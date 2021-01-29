import { predict } from "../predictions/getPredict";

export async function predictWithWebWorker(startText: string) : Promise<string> {
  return await predict(startText);
}
