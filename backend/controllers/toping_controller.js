const Topping = require('../models/Toping');

const getAllToppings = async (req, res) => {
  try {
    const toppings = await Topping.find();
    res.json(toppings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllToppings};