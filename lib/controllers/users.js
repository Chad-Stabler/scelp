const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const oneDayMs = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/', [authenticate, authorize], async (req, res, next) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const token = await UserService.create(req.body);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: oneDayMs
        }).json({ message: 'Account created successfully' });
    } catch (e) {
      next(e);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.signIn(req.body);

      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: oneDayMs
      }).json({ message: 'Signed in successfully' });
    } catch (e) {
      next(e);
    }
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME, {
        httpOnly: true,
        maxAge: oneDayMs
      }).status(204).send();
  });
