
//import {FileData} from "./class_filedata";
let Promise = require('bluebird');
let fs = require("fs");

export class FileRW {

    filename = "server_data.json";
    writeFilePromise = Promise.promisify(require("fs").writeFile);

    constructor() { }

    // note: synchronous file-reading, should be in a promise!
    public read_file(): string {
        let data: string;
        try {
            data = fs.readFileSync(this.filename, 'utf8');
            console.log("read_file: success");
            console.log(data);
        } catch(e) {
            console.log('read_file: error loading file, return blank array');
            data = '[]';
        }
        return data;
    }

    // note: basically wrap the sync read-file in a promise
    //       store the data in an obj that can be returned
    // todo: change 'any' to 'typeof FileData' and create the declaration file class_filedata.d.ts
    public read_file_async(fileobj: any): void {
        new Promise(function (resolve, reject) {
            fileobj.content = fs.readFileSync(this.filename, 'utf8');
            fileobj.filename = this.filename;
            resolve(fileobj);
        });
    }

    // note: promisify this later!
    public write_file(data: string): void {
        fs.writeFile(this.filename, data, function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("write_file: success");
        });
    }

    // note: asynchronous file-writing
    // returns right away, will let promise take care the writing process
    public write_file_async(data: string): void {

        this.writeFilePromise(this.filename, data)
            .then(
                function () {
                    console.log("writeFilePromise: success");
                }
            )
            .catch(
                function () {
                    console.log("writeFilePromise: error");
                }
            );
        console.log("write_file_async: started the file write, wait for promise to be fulfilled");
    }
}
