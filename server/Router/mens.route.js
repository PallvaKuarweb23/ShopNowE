const express = require("express");
require("dotenv").config();

const { MensList } = require("../model/mens.model");
const mensRouter = express.Router();
mensRouter.post("/post", async (req, res) => {
  try {
    const MensData = new MensList(req.body);
    await MensData.save();
    res.status(200).json({ MensData: MensData, message: "MensData Added" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
mensRouter.get("/mens", async (req, res) => {
  try {
    const { category, color, brand, page, limit, sort, order } = req.query;

    const filters = {};
    if (category) {
      filters.category = category;
    }
    if (color) {
      filters.color = color;
    }
    if (brand) {
      filters.brand = { $regex: brand, $options: "i" };
    }

    const sorting = {};

    if (sort && order) {
      sorting[sort] = order === "desc" ? -1 : 1;
    } else {
      sorting.price = 1; // Default sorting by price in ascending order
    }

    const mensData = await MensList.find(filters).sort(sorting);

    res.json(mensData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
mensRouter.get("/mens/search", async (req, res) => {
  try {
    const { brand } = req.query;

    if (!brand) {
      return res
        .status(400)
        .json({ message: "Brand name is required for the search." });
    }

    const filters = {
      brand: { $regex: brand, $options: "i" },
    };

    const searchResults = await MensList.find(filters);

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
mensRouter.get("/mens/:id", async (req, res) => {
  try {
    const itemId = req.params.id; // Get the item's ID from the URL parameter

    // Use Mongoose to find the item by its ID
    const item = await MensList.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = { mensRouter };
