const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    orderId: String,
    distributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Distributor"
    },
    product: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      qty: Number,
      total_packets: Number,
    }],
    outstanding_price: Number,
    total: Number,
    orderType: {
      type: String,
      enum: ['accept', 'deliver', 'rejected'],
      default: 'accept'
    },
  })
);

module.exports = Order;
