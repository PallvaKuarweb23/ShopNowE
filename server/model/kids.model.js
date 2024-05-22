const mongoose = require("mongoose");
const kidsSchema = new mongoose.Schema({
  image: { type: String, require: true },
  brand: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
  color: { type: String, require: true },
});

const KidsList = mongoose.model("KidsData", kidsSchema);

module.exports = { KidsList };
