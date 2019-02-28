//
// typescript code for a simple hapi server
// sample script, not used in main project
//

import * as Hapi from "hapi";
export class Server {

  private port: number;
  private hapiServer: Hapi.Server;

  constructor(port: number) {
    this.port = port;
    this.hapiServer = new Hapi.Server();
  }

  public start(): void {
    this.hapiServer.connection({port: this.port})
    this.hapiServer.start((err) => {
      if(err) {
        throw err;
      }

      console.log("Server running!");
    });
  }
}
