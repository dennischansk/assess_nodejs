//
// drop in replacement for class_storage but with db instead of file
//

//import { transaction } from 'objection';
//let Promise = require('bluebird');
//let NewItem = require("./class_item");
let dbIO = require("./class_database");

let dbio: typeof dbIO = new dbIO.Database();

export class StorageDB {

    //private store: typeof NewItem[] = undefined;
    //private id: number = undefined;

    constructor() {
        console.log("storagedb: constructor: ");
    }

    public init() {
        console.log("storagedb: init: ");
    }

    public add_item(phrase: string) {
        console.log("storagedb: add_item: ");
        dbio.add_item(phrase);
    }

    public del_item(id: number) {
        console.log("storagedb: del_item: ");
        dbio.del_item(id);
    }

    public get_all() {
        console.log("storagedb: get_all: ");
        const items = dbio.get_all();
        return items;
    }

}
