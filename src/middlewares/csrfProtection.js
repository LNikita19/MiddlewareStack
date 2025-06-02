const csrf = require('csurf');
const cookieParser = require('cookie-parser');

function setupCsrf(app) {
  app.use(cookieParser());
  app.use(csrf({ cookie: true }));

  // Send CSRF token cookie for SPA or client use
  app.use((req, res, next) => {
    if (req.csrfToken) {
      res.cookie('XSRF-TOKEN', req.csrfToken());
    }
    next();
  });
}

// Middleware to protect routes (POST, PUT, DELETE)
const csrfProtection = csrf({ cookie: true });

module.exports = { setupCsrf, csrfProtection };
