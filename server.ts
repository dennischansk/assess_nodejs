//
// server.ts
//
// starts a server and creates the endpoints
//

import * as PreparedServer from "./class_server";
import * as PhraseStorage from "./class_storage";

let server: PreparedServer.Server = new PreparedServer.Server(8080);
let store: PhraseStorage.Storage = new PhraseStorage.Storage();

function func_hello_world(req, res): void {
  console.log("hapi hello world");
  res("hello world");
}

function func_read(req, res): void {
  console.log("calling read");
  res(store.get_all());
}

function func_write(req, res): void {
  console.log("calling write: "+JSON.stringify(req.payload));
  var phrase: string = undefined;
  var id: number = undefined;
  if (req.payload && req.payload.hasOwnProperty('phrase')) {
    phrase = req.payload.phrase;
    id = store.add_item(phrase);
  }
  res(JSON.stringify({"id":id}));
}

function func_delete(req, res): void {
    console.log("calling delete: "+JSON.stringify(req.payload));
    var phrase: string = undefined;
    var id: number = undefined;
    if (req.payload && req.payload.hasOwnProperty('id')) {
        id = req.payload.id;
        phrase = store.del_item(id);
    }
    res(JSON.stringify({"phrase":phrase}));
}


server.connect();
server.route("/", "GET", func_hello_world);
server.route("/read", "GET", func_read);
server.route("/write", "POST", func_write);
server.route("/delete", "POST", func_delete);
server.start();

