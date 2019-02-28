
exports.up = function(knex, Promise) {

    return Promise.all([
        knex.schema.createTable('phrases', function(table) {
            table.increments('id');
            table.text('phrase');
        }),
    ]);
  
};

exports.down = function(knex, Promise) {

    return Promise.all([
        knex.schema.dropTableIfExists('phrases'),
    ]); 
  
};

