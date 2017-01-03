
exports.up = function(knex, Promise) {
  	return Promise.all([

        knex.schema.createTableIfNotExists('users', function(table) {
            table.increments('id').primary();
            table.string('username');
            table.unique('username')
            table.string('password');
            table.string('name');
            table.string('email');
            table.unique('email')
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('companies', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('location');
            table.string('phone', 20);
            table.index('user_id', 'index');
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
                
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('listers', function(table){
            table.increments('id').primary();
            table.string('name');
            table.index('company_id', 'index');
            table.integer('company_id')
                .unsigned()
                .references('id')
                .inTable('companies')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('lister_items', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('description');
            
            table.index('lister_id', 'index');
            
            table.integer('lister_id')
                .unsigned()
                .references('id')
                .inTable('listers')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('item_attrs', function(table){
            table.increments('id').primary();
            table.string('value');
            table.string('type');
            table.string('unit');
            table.integer('lister_item_id')
                .unsigned()
                .references('id')
                .inTable('lister_items')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.index('lister_item_id', 'index');

            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('generals', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            table.string('description');
            table.string('unit');
            table.timestamps();
        }),
        knex.schema.createTableIfNotExists('books', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            table.string('description');
            table.string('unit');
            table.timestamps();
        }),
        knex.schema.createTableIfNotExists('drinks', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            table.string('description');
            table.string('unit');
            table.timestamps();
        }),
        knex.schema.createTableIfNotExists('weeds', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            table.string('description');
            table.string('unit');
            table.timestamps();
        }),
    ])
};

exports.down = function(knex, Promise) {
  	return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('companies'),
        knex.schema.dropTable('listers'),
        knex.schema.dropTable('lister_items'),
        knex.schema.dropTable('item_attributes'),
        knex.schema.dropTable('attributes')
    ])
};