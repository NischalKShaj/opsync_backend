import { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
}

export async function down(knex: Knex) {
  await knex.raw(`DROP EXTENSION IF EXISTS "pgcrypto";`);
}
