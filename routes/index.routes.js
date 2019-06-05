const express = require('express');
const router = express.Router();


// Define our routes in a modular way
router.use('/api/v1/car', require('./car.routes'));
router.use('/api/v1/user', require('./user.routes'));
router.use('/api/v1/order', require('./order.routes'));

module.exports = router;