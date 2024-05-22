const express = require("express");
require("dotenv").config();

const { WomensList } = require("../model/women.model");
const womensRouter = express.Router();
womensRouter.post("/post", async (req, res) => {
  try {
    const WoensData = new WomensList(req.body);
    await WoensData.save();
    res.status(200).json({ MensData: WoensData, message: "MensData Added" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
womensRouter.get("/womens", async (req, res) => {
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

    const womensData = await WomensList.find(filters).sort(sorting);

    res.json(womensData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
womensRouter.get("/womens/search", async (req, res) => {
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

    const searchResults = await WomensList.find(filters);

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
womensRouter.get("/womens/:id", async (req, res) => {
  try {
    const itemId = req.params.id; // Get the item's ID from the URL parameter

    // Use Mongoose to find the item by its ID
    const item = await WomensList.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = { womensRouter };
