import { predict } from "../predictions/getPredict";

export async function predictWithWebWorker(startText: string, musicLength: number, temperature: number) : Promise<string> {
  return await predict(startText ,musicLength, temperature); 
}