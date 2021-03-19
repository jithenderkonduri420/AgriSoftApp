const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    fileName: String,
    packet: Number,
    fileOriginalName: String,
    status: { type: Boolean, default: true }
  })
);

module.exports = Product;
