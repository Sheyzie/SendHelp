/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  console.log('checking if posts table exists...');
  try {
    const exists = await knex.schema.hasTable('posts');
    if (!exists){
      console.log('creating posts table...');
      await knex.schema.createTable('posts', (table) => {
        table.increments('post_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.user_id');
        table.integer('service_type_id').unsigned().notNullable();
        table.foreign('service_type_id').references('service_types.service_type_id');
        table.text('caption').notNullable();
        table.string('location').notNullable();
        table.string('status', 20).notNullable();
        table.binary('image_data').notNullable();;
      })
      console.log('posts table created successfully');
    } else {
      console.log('posts table exists in database');
    }
  } catch (error) {
    console.log('Error creating posts table');
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  console.log('dropping posts table...');
  return await knex.schema.dropTableIfExists('posts');
};
