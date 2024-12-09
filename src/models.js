const mongoose = require("mongoose");

const ShopperSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: Number,
    age: Number,
    address: String,
    password: String,
});

const ProductSchema = new mongoose.Schema({
    id: Number,
    description: String,
    category: String,
    unit: String,
    price: Number,
    weight: String,
    timestamp: String,
});

const CartSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
});

const ReturnSchema = new mongoose.Schema({
    shopperId: String,
    productName: String,
    status: String,
});

const Shopper = mongoose.model("Shopper", ShopperSchema);
const Product = mongoose.model("Product", ProductSchema);
const Return = mongoose.model("Return", ReturnSchema);
const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Shopper, Product, Cart, Return };
