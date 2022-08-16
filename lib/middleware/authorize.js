module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email !== ('admin@scelp.net')) throw new Error('You are not authorized');

    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
