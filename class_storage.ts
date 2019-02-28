//
// typescript code for a simple storage system
// manipulates class_item objects (get, add, del)
// after each manipulation, save the data, as needed
//
// note that this code manipulates objects from Item class
// it is probably simpler to just use json objects which can
// be easily serialize/deserialize from a text file.
//

let NewItem = require("./class_item");
let FileIO = require("./class_filerw");
let Promise = require('bluebird');

/*
interface ItemInterface {
    id: number
    phrase: string
}
*/

let fileio: typeof FileIO = new FileIO.FileRW();

export class Storage {

    private store: typeof NewItem[] = undefined;
    private id: number = undefined;


    constructor() {
        this.store = [];
        this.id = 0;

        // take the json string and deserialize it,
        // then recreate all the Items into storage
        //
        //this.store = JSON.parse(fileio.read_file()) as NewItem.Item[]; //does not work
        const store_json = JSON.parse(fileio.read_file()); // as ItemInterface[];
        for (const obj of store_json) {
            let item: typeof NewItem = new NewItem.Item(obj.id, obj.phrase);
            if (this.id < item.get_id()) {
                this.id = item.get_id();
            }
            this.store.push(item);
        }
        console.log("storage: constructor: success")
    }

    // use this in the case where constructor is simply just initializing empty data
    // it returns a promise that does the file reading and deserialization
    // it is possible that add/del items gets called before this code completes
    // which means that some kind of flag is needed that can indicate when its ready
    //
    public init(): typeof Promise {
        return new Promise( function(resolve, reject) {
            const store_json = JSON.parse(fileio.read_file()); // as ItemInterface[];
            // here is the complicated part where the deserialize json is used
            // to create new Item objects to be stored in an array
            for (const obj of store_json) {
                let item: typeof NewItem = new NewItem.Item(obj.id, obj.phrase);
                if (this.id < item.get_id()) {
                    this.id = item.get_id();
                }
                this.store.push(item);
            }
            console.log("storage: init: success")
            resolve(); //all done
        });
    }

    public add_item(phrase: string): number {
        this.id = this.id + 1;
        let item: typeof NewItem = new NewItem.Item(this.id, phrase);
        this.store.push(item);
        console.log("storage: add_item: "+phrase);

        fileio.write_file_async(JSON.stringify(this.store));
        return this.id;
    }

   public del_item(id: number): string {
        console.log("storage: del_item: ");

        let p: string = undefined

        this.store.forEach(
            (item, index) => {
                if (item.get_id()==id) {
                    p = item.get_phrase();
                    this.store.splice(index,1);
                    console.log("del_item: removed id="+id);
                    fileio.write_file_async(JSON.stringify(this.store));
                }
            }
        );
        return p;
   }

   public get_all(): string {
       console.log("storage: get_all: ");
       let i: number;
       for (i = 0; i < this.store.length; i++) {
           console.log("storage: " + this.store[i].get_id() + ": " + this.store[i].get_phrase());
       }
       return JSON.stringify(this.store);
   }

    // @ts-ignore
    public get_item(id: number): any {
        let i: number;
        for (i=0; i<this.store.length; i++) {
            if (this.store[i].get_id() == id) {
                console.log("storage: get_item: "+this.store[i].get_phrase());
                return JSON.stringify(this.store[i]);
            }
        }
        console.log("storage: get_item: ");
        return undefined;
    }
}
