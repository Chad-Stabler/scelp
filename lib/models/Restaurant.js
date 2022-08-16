const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  description;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.description;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from restaurants');

    return rows.map(row => new Restaurant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(`select restaurants.*,
    coalesce(
        json_agg(to_jsonb(reviews))
        filter (where reviews.id is not null), '[]') as reviews from restaurants
        left join reviews_restaurants on reviews_restaurants.restaurants_id = restaurants.id
        left join reviews on reviews_restaurants.reviews_id = reviews.id
        where restaurants.id = $1
        group by restaurants.id;
    `, [id]);
    return new Restaurant(rows[0]);
  }
};
