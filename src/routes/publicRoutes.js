const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/public', publicController.getPublic);

module.exports = router;
