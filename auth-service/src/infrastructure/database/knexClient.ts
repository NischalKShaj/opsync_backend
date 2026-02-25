import knex from "knex";
import knexConfig from "../../../knexfile";

const environment = "development";
export const db = knex(knexConfig[environment]);
