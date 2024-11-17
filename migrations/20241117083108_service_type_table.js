/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  console.log('checking if service_types table exists...');
  try {
    const exists = await knex.schema.hasTable('service_types');
    if (!exists){
      console.log('creating service_types table...');
      await knex.schema.createTable('service_types', table => {
        table.increments('service_type_id').primary();
        table.integer('provider_id').unsigned().notNullable();
        table.foreign('provider_id').references('providers.provider_id');
        table.string('service', 50).notNullable();
        table.string('state', 50).notNullable();
        table.string('LGA', 50).notNullable();
        table.string('service_head', 50).notNullable();
        table.string('contacts', 50).notNullable();
        table.string('location', 255).notNullable();
      });
      console.log('service_types table created successfully');
    } else {
      console.log('service_types table exists in database');
    }
  } catch (error){
    console.log('Error creating service_types table');
    console.error(error)
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  console.log('dropping service_types table...');
  return await knex.schema.dropTableIfExists('service_types');
};
