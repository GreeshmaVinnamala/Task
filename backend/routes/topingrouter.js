const express = require('express');
const router = express.Router();
const { getAllToppings} = require('../controllers/toping_controller');

router.get('/', getAllToppings);

module.exports = router;