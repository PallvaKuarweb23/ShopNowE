const express = require("express");
require("dotenv").config();

const { CartItem } = require("../model/cart.model");
const cartRouter = express.Router();
// Update the "add-to-cart" route
cartRouter.post("/add-to-cart", async (req, res) => {
  const {
    productId,
    productName,
    productImage,
    price,
    quantity,
    userId,
    description,
  } = req.body;

  // Get the currently authenticated user (you may need to implement user authentication)

  const cartItem = new CartItem({
    productId,
    productName,
    productImage,
    price,
    quantity,
    description,
    userId, //  Associate the cart item with the user
  });

  try {
    await cartItem.save();
    res.status(201).json({ message: "Item added to the cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to the cart" });
  }
});

cartRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartItem.find({ userId });

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Define a route to delete a product from the cart based on userId and productId
cartRouter.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Use Mongoose to find and remove the product from the cart
    const deletedProduct = await CartItem.findOneAndDelete({
      userId: userId,
      productId: productId,
    });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found in the cart." });
    }

    res.json({ message: "Product removed from the cart successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});
cartRouter.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Use Mongoose to find and remove all cart items with the provided userId
    const result = await CartItem.deleteMany({ userId: userId });

    if (result.deletedCount > 0) {
      res.status(200).json({
        message: `Deleted ${result.deletedCount} cart items for user with userId: ${userId}`,
      });
    } else {
      res.status(404).json({
        message: `No cart items found for user with userId: ${userId}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to check if a product is in the user's cart
cartRouter.get("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Search for the product in the cart using the userId and productId
    const productInCart = await CartItem.findOne({
      userId: userId,
      productId: productId,
    });

    if (productInCart) {
      // Product is in the cart
      res.json(true);
    } else {
      // Product is not in the cart
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = { cartRouter };
