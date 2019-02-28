//
// typescript code for a simple hapi server
// creates a hapi server
// and convenience function to add routes and to start the server
//

import * as Hapi from "hapi";

export class Server {

  private port: number;
  private hapiServer: Hapi.Server;

  constructor(port: number) {
    this.port = port;
    this.hapiServer = new Hapi.Server();
  }

  public connect(): void {
    this.hapiServer.connection({port: this.port})
  }

  public route(endpoint: string, type: string, route_handler): void {
    this.hapiServer.route({
      method: type,
      path: endpoint,
      handler: route_handler
    });
  }

  public start(): void {
    this.hapiServer.start((err) => {
      if(err) {
        throw err;
      }

      console.log("Server running!");
    });
  }
}
