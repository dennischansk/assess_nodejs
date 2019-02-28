//
// typescript code for a simple storage system
// more or less mirrors class_storage, so that it can be
// a drop in replacement for it.
//

import * as Knex from 'knex';
import { Model } from 'objection';
import Item from './model_item';

//let Promise = require('bluebird');

export class Database {


    constructor () {
        console.log("database: constructor: ");
        const knexConfig = require('./knexfile');
        const knex = Knex(knexConfig.dev_local);
        Model.knex(knex);
    }

    public async add_item(phrase: string) {
        console.log("database: add_item: ");
        await Item.query().insertGraph({
            phrase : phrase
        }).catch(function(){console.log("AAARRRGGGHHH!!!");});
    }

    public async del_item(id: number) {
        console.log("database: del_item: ");
        await Item.query().deleteById(id)
            .catch(function(){console.log("DAAAAMMMMNNNN!!!");});
    }

    public async get_all() {
        console.log("database: get_all: ");
        const items = await Item.query().catch(function(){console.log("GGGAAARRRGGGHHH!!!");});
        return(items);
    }
}