
module.exports = {

    client: 'pg',

    dev_local: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            database: 'phrase_holder',
            user: 'dennischan',
            password: '' // local dev
        },
        pool: {
            min: 2,
            max: 5
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
