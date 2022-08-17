const pool = require('../utils/pool');

module.exports = class Review {
  id;
  scelp_users_id;
  restaurants_id;
  detail;
  stars;

  constructor(row) {
    this.id = row.id;
    this.scelp_users_id = row.scelp_users_id;
    this.restaurants_id = row.restaurants_id;
    this.detail = row.detail;
    this.stars = row.stars;
  }

  static async insert(id, review, userId) {
    
    const { rows } = await pool.query('insert into reviews (stars, detail, restaurants_id, scelp_users_id) values ($1, $2, $3, $4) returning *;', [review.stars, review.detail, id, userId]);
    await pool.query('insert into reviews_restaurants (restaurants_id) values ($1) returning *;', [id]);
    return new Review(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('select * from reviews where id = $1;', [id]);
    return new Review(rows[0]);
  }

  static async remove(id) {
    const { rows } = await pool.query('delete from reviews where id = $1 returning *;', [id]);

    return new Review(rows[0]);
  }
};
