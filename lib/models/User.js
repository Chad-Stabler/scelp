const pool = require('../utils/pool');

module.exports =  class User {
  id;
  first_name;
  last_name;
  email;
  #password_hash;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.email = row.email;
    this.#password_hash = row.password_hash;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from scelp_users');

    return rows.map(row => new User(row));
  }

  static async insert({ first_name, last_name, email, password_hash }) {
    const { rows } = await pool.query(`
    insert into scelp_users (first_name, last_name, email, password_hash) values ($1, $2, $3, $4) returning *;`, [first_name, last_name, email, password_hash]);
    return new User(rows[0]);
  }

  static async getByEmail(email) {
    const { rows } = await pool.query('select * from scelp_users where email = $1', [email]);
    if (!rows) return null;
    return new User(rows[0]);
  }

  get password_hash() {
    return this.#password_hash;
  }
};
