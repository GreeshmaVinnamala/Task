const express = require('express');
const router = express.Router();
const { getAllPizzas } = require('../controllers/pizza_controller');

router.get('/', getAllPizzas);

module.exports = router;