const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/storefront', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


const Shopper = require('./models/shopper');
const Product = require('./models/product');
const Cart = require('./models/cart');
const Return = require('./models/return');


app.post('/api/shopper', async (req, res) => {
    try {
        const shopper = new Shopper(req.body);
        const savedShopper = await shopper.save();
        res.status(201).json(savedShopper);
    } catch (error) {
        res.status(500).json({ message: 'Error creating shopper', error });
    }
});

app.get('/api/shopper', async (req, res) => {
    try {
        const shoppers = await Shopper.find();
        res.json(shoppers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shoppers', error });
    }
});


app.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
});


app.post('/api/cart', async (req, res) => {
    try {
        const cartItem = new Cart(req.body);
        const savedCartItem = await cartItem.save();
        res.status(201).json(savedCartItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
});


app.post('/api/returns', async (req, res) => {
    try {
        const returnRequest = new Return(req.body);
        const savedReturn = await returnRequest.save();
        res.status(201).json(savedReturn);
    } catch (error) {
        res.status(500).json({ message: 'Error processing return', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
