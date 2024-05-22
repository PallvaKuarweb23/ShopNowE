const express = require("express");
require("dotenv").config();

const { KidsList } = require("../model/kids.model");
const kidsRouter = express.Router();
kidsRouter.post("/post", async (req, res) => {
  try {
    const KidsData = new KidsList(req.body);
    await KidsData.save();
    res.status(200).json({ KidsData: KidsData, message: "MensData Added" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
kidsRouter.get("/kids", async (req, res) => {
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

    const KidsData = await KidsList.find(filters).sort(sorting);

    res.json(KidsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
kidsRouter.get("/kids/search", async (req, res) => {
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

    const searchResults = await KidsList.find(filters);

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
kidsRouter.get("/kids/:id", async (req, res) => {
  try {
    const itemId = req.params.id; // Get the item's ID from the URL parameter

    // Use Mongoose to find the item by its ID
    const item = await KidsList.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = { kidsRouter };
