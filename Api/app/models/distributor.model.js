const mongoose = require("mongoose");

const Distributor = mongoose.model(
    "Distributor",
    new mongoose.Schema({
        brand: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Brand"
            }
        ],
        name: String,
        email: String,
        phone: Number,
        address: String,
        route: String,
        location: String,
        products: Array,
        crateLimit: Number,
        cashLimit: Number,
        password: String,
        passwordHash: String,
        code: String,
        passwordChanged: { type: Boolean, default: false }

    })
);

module.exports = Distributor;
