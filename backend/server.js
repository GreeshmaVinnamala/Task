const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const pizzaRoutes = require('./routes/pizzarouter');
const toppingRoutes = require('./routes/topingrouter');

mongoose.connect(process.env.db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/api/pizzas', pizzaRoutes);
app.use('/api/toppings', toppingRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});