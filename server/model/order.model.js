const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  Phone: { type: Number },
  address: { type: String },
  userId: { type: String },
  totalPrice: { type: Number },
  status: {
    type: String,
    enum: ["inprogress", "completed", "cancelled"], // Add possible status values
    default: "inprogress", // Set the default value
  },
});

const OrderModel = mongoose.model("orderData", orderSchema);

module.exports = { OrderModel };
