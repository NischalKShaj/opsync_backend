import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("organizations", (table) => {
    table.uuid("id").primary();

    table.string("name", 150).notNullable().unique();

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("organizations");
}
