const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  productImage: { type: String, require: true },
  price: Number,
  quantity: Number,
  userId: String,
  description: String,
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = { CartItem };
