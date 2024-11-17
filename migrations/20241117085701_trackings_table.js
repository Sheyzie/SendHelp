/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  console.log('checking if trackings table exists...');
  try {
    const exists = await knex.schema.hasTable('trackings');
    if (!exists){
      console.log('creating trackings table...');
      await knex.schema.createTable('trackings', (table) => {
        table.increments('tracking_id').primary();
        table.integer('post_id').unsigned().notNullable();
        table.foreign('post_id').references('posts.post_id');
        table.integer('provider_id').unsigned().notNullable();
        table.foreign('provider_id').references('providers.provider_id');
        table.string('status', 25).notNullable();
      })
      console.log('trackings table created successfully');
    } else {
      console.log('trackings table exists in database');
    }
  } catch (error) {
    console.log('Error creating trackings table');
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  console.log('dropping trackings table');
  return await knex.schema.dropTableIfExists('trackings');
};
