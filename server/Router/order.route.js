const express = require("express");
require("dotenv").config();

const { OrderModel } = require("../model/order.model");
const orderRouter = express.Router();
orderRouter.post("/", async (req, res) => {
  try {
    // Create a new order based on the request body
    const newOrder = new OrderModel(req.body);

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with the saved order data
    res.status(200).json({ savedOrder, message: "order Placed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
orderRouter.get("/orders", async (req, res) => {
  try {
    // Use Mongoose to find all orders in the database
    const orders = await OrderModel.find();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
orderRouter.delete("/orders/:id", async (req, res) => {
  try {
    const orderID = req.params.id;

    // Use Mongoose to find and remove the order by its _id
    const deletedOrder = await OrderModel.findOneAndRemove({ _id: orderID });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { orderRouter };
