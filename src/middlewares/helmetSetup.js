const helmet = require('helmet');

function setupHelmet(app) {
  app.use(helmet());
}

module.exports = setupHelmet;
