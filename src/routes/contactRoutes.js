const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const rateLimiter = require('../middlewares/rateLimiter');
const sanitizeInputs = require('../middlewares/inputSanitizer');

router.post('/Contact', rateLimiter, sanitizeInputs, contactController.postContact);

module.exports = router;
