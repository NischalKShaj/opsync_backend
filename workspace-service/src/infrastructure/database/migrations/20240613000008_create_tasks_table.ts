import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('project_id').notNullable().references('id').inTable('projects').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description');
    table.enum('status', ['todo', 'in_progress', 'review', 'completed']).defaultTo('todo');
    table.enum('priority', ['low', 'medium', 'high', 'urgent']).defaultTo('medium');
    table.uuid('assignee_id');
    table.timestamp('due_date');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.index('project_id');
    table.index('assignee_id');
    table.index('status');
    table.index('priority');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('tasks');
}
