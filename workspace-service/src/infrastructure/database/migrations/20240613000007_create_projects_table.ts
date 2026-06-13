import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('projects', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('team_id').notNullable().references('id').inTable('teams').onDelete('CASCADE');
    table.string('name').notNullable();
    table.text('description');
    table.enum('status', ['active', 'archived', 'completed']).defaultTo('active');
    table.timestamp('start_date');
    table.timestamp('end_date');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.index('team_id');
    table.index('status');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('projects');
}
