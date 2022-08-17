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
    
    await pool.query('insert into reviews_restaurants (restaurants_id) values ($1) returning *;', [id]);
    const { rows } = await pool.query('insert into reviews (stars, detail, restaurants_id, scelp_users_id) values ($1, $2, $3, $4) returning *;', [review.stars, review.detail, id, userId]);
    return new Review(rows[0]);
  }
};
