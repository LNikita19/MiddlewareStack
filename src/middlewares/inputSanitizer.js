const mongoSanitize = require('mongo-sanitize');
const sanitizeHtml = require('sanitize-html');

function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      // Remove $ and . from keys to prevent NoSQL injection
      const cleanKey = key.replace(/\$/g, '').replace(/\./g, '');
      let value = obj[key];

      if (typeof value === 'string') {
        let cleanValue = mongoSanitize(value);
        cleanValue = sanitizeHtml(cleanValue, {
          allowedTags: [], // strip all HTML tags
          allowedAttributes: {},
        });
        value = cleanValue;
      } else if (typeof value === 'object') {
        value = sanitizeObject(value);
      }

      sanitized[cleanKey] = value;
    }
  }
  return sanitized;
}

function sanitizeInputs(req, res, next) {
  req.body = sanitizeObject(req.body);
  req.params = sanitizeObject(req.params);

  // Sanitize req.query properties in place (do NOT overwrite req.query)
  for (const key in req.query) {
    if (Object.hasOwnProperty.call(req.query, key)) {
      let value = req.query[key];
      if (typeof value === 'string') {
        let cleanValue = mongoSanitize(value);
        cleanValue = sanitizeHtml(cleanValue, {
          allowedTags: [],
          allowedAttributes: {},
        });
        req.query[key] = cleanValue;
      } else if (typeof value === 'object') {
        req.query[key] = sanitizeObject(value);
      }
    }
  }

  next();
}

module.exports = sanitizeInputs;
