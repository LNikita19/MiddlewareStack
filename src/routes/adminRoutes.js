const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ipBlacklist } = require('../middlewares/ipBlacklist');
const sanitizeInputs = require('../middlewares/inputSanitizer');

router.use(ipBlacklist); // block blacklisted IPs on admin routes
router.use(sanitizeInputs);

router.get('/blacklisted', adminController.getBlacklist);
router.post('/blacklisted/add', adminController.addToBlacklist);
router.delete('/blacklist/remove', adminController.removeFromBlacklist);

module.exports = router;
