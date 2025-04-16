const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  type:{
    type:String, 
    required:true
   }, 
  basePrice:{
    type: Number,
    required:true
  },
  name:{
    type: String,
    required:true
  },
  description:{
    type: String,
    required:true
 },
  ingredients:{
    type: [String],
    required:true,
  },
  toppings:{
    type: [String],
    required:true
  },
  image:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Pizza', pizzaSchema);