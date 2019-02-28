
import * as Promise from 'bluebird';
import * as fs from "fs";

export class FileRW {

    private filename = "server_data.json"
    private writeFilePromise = Promise.promisify(require("fs").writeFile);

    constructor() { }

    // note: synchronous file-reading, should be in a promise!
    public read_file(): string {
        var data: string
        try {
            data = fs.readFileSync(this.filename, 'utf8');
            console.log("read_file: success")
            console.log(data);
        } catch(e) {
            console.log('read_file: error loading file, return blank array');
            data = '[]'
        }
        return data
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