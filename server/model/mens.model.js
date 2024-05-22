const mongoose = require("mongoose");
const MensSchema = new mongoose.Schema({
  image: { type: String, require: true },
  brand: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
  color: { type: String, require: true },
});

const MensList = mongoose.model("mensData", MensSchema);

module.exports = { MensList };
