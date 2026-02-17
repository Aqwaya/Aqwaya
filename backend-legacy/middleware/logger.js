// middleware/logger.js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next(); // allow request to continue
};

module.exports = { logger };
