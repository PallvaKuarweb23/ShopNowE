// const { Router } = require("express");
// const { instance } = require("../config/payment");

// const paymentrouter = Router();

// paymentrouter.post("/makepayment", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     // Attempt to create an order with Razorpay
//     const order = await instance.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: "receipt#1",
//       partial_payment: false,
//     });

//     if (order) {
//       // Order creation was successful
//       res.status(201).send({
//         isError: false,
//         message: "Payment success",
//         payment_data: order,
//       });
//     } else {
//       // Order creation failed (This condition may not occur, but it's good to have the error handling)
//       res.status(400).send({
//         isError: true,
//         message: "Order creation failed",
//       });
//     }
//   } catch (error) {
//     // Handle any unexpected errors
//     console.error(error);
//     res.status(500).send({
//       isError: true,
//       message: "An error occurred while processing the payment",
//     });
//   }
// });

// module.exports = { paymentrouter };
