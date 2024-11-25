const mongoose = require("mongoose");

const ShopperSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
});

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
});

const BillingSchema = new mongoose.Schema({
    shopperId: String,
    address: String,
    paymentMethod: String,
});

const ReturnSchema = new mongoose.Schema({
    shopperId: String,
    productName: String,
    status: String,
});

const Shopper = mongoose.model("Shopper", ShopperSchema);
const Product = mongoose.model("Product", ProductSchema);
const Billing = mongoose.model("Billing", BillingSchema);
const Return = mongoose.model("Return", ReturnSchema);

module.exports = { Shopper, Product, Billing, Return };
