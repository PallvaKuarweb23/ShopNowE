const mongoose = require("mongoose");
const womensSchema = new mongoose.Schema({
  image: { type: String, require: true },
  brand: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
  color: { type: String, require: true },
});

const WomensList = mongoose.model("WomensData", womensSchema);

module.exports = { WomensList };
