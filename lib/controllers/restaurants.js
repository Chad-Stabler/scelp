const { Router } = require('express');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/:restId/reviews', authenticate, async (req, res, next) => {
    try {
      const review = await Review.insert(req.params.restId, req.body, req.user.id);
      res.json(review);
    } catch (e) {
      next(e);
    }
  })
  .get('/:restId', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.restId);
      res.json(restaurant);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  })
  .delete('');
