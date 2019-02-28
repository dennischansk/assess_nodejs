//
//
//

import { Model } from 'objection';
//import { join } from 'path';

//let NewItem = require("./class_item");

export default class Item extends Model {

    id : number;
    phrase : string;

    static tableName = 'phrases';

    // for validation only
    static jsonSchema = {
        type: 'object',

        properties: {
            id: {type: 'integer'},
            phrase: { type: 'string'}
        }
    }

}