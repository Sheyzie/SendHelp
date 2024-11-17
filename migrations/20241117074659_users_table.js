/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  console.log('checking if users tables exists...');
  try {
    const exists = await knex.schema.hasTable('users'); // returns true or false
    
    if(!exists){
      console.log('creating users table...');
      await knex.schema.createTable('users', table => {
        table.increments('user_id').primary();
        table.string('first_name', 25).notNullable();
        table.string('last_name', 25).notNullable();
        table.string('email', 50).notNullable().unique();
        table.string('password_hash').notNullable();
        table.string('phone_number', 25).notNullable();
        table.string('country', 25).notNullable();
        table.string('state', 25).notNullable();
        table.string('LGA', 50).notNullable();
        table.string('address', 200).notNullable();
        table.string('terms', 10).notNullable();
        table.string('status', 10).notNullable();
        // table.timestamp('created_at').defaultTo(knex.fn.now());
        // table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      console.log('users table created successfully');
    } else {
      console.log('users table exists in database');
    }
  }catch (error){
    console.log('Error creating users table');
    console.error(error);
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  console.log('dropping users table...');
  return await knex.schema.dropTableIfExists('users');
};
