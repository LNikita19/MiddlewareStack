const express = require('express');
const router = express.Router();
const submitController = require('../controllers/submitController');
const { csrfProtection } = require('../middlewares/csrfProtection');
const sanitizeInputs = require('../middlewares/inputSanitizer');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/submit', rateLimiter, csrfProtection, sanitizeInputs, submitController.postSubmit);

module.exports = router;
