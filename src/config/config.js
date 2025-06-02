require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  rateLimitWindowMs: (process.env.RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  apiKey: process.env.API_KEY,
  csrfSecret: process.env.CSRF_SECRET
};
