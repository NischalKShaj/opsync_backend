import knex from "knex";
// FIX: use require for CommonJS knexfile.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../../../knexfile.cjs");

export const db = knex(config.development);
