//
// typescript code for a simple storage system
// manipulates class_item objects (get, add, del)
// after each manipulation, save the data, as needed
//

import * as NewItem from "./class_item";
import * as FileIO from "./class_filerw";

/*
interface ItemInterface {
    id: number
    phrase: string
}
*/

let fileio: FileIO.FileRW = new FileIO.FileRW();

export class Storage {

    private store: NewItem.Item[] = undefined;
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
            let item: NewItem.Item = new NewItem.Item(obj.id, obj.phrase);
            if (this.id < item.get_id()) {
                this.id = item.get_id();
            }
            this.store.push(item);
        }

        console.log("storage: constructor: success")
    }

    public add_item(phrase: string): number {
        this.id = this.id + 1;
        let item: NewItem.Item = new NewItem.Item(this.id, phrase);
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
