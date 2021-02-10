declare module 'comlink-loader!*' {
    class WebpackWorker extends Worker {
      constructor();
      predictWithWebWorker(startText: string): Promise<string>;
    }
    export = WebpackWorker;
  }