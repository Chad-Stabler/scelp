const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Review = require('../models/Review');

module.exports = Router()
  .delete('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const resp = await Review.remove(req.params.id);
      res.json(resp);
    } catch (e) {
      next(e);
    }
  });
