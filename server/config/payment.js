const Razorpay = require("razorpay");
require("dotenv").config();

var instance = new Razorpay({
  key_id: process.env.payment_id,
  key_secret: process.env.payment_key,
});

module.exports = { instance };
