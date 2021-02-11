declare module 'comlink-loader!*' {
    class WebpackWorker extends Worker {
      constructor();
      predictWithWebWorker(startText: string, musicLength: number, temperature: number): Promise<string>;
    }
    export = WebpackWorker;
  }