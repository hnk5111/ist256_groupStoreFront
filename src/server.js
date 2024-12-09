const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/ist256_groupStoreFront', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


const { Shopper, Product, Cart, Return } = require('./models'); // Use from models.js

// Create a new shopper
app.post('/api/shopper', async (req, res) => {
    try {
        const shopper = new Shopper(req.body); // Validate the incoming data
        const savedShopper = await shopper.save(); // Attempt to save to DB
        res.status(201).json(savedShopper); // Return success response
    } catch (error) {
        console.error('Error creating shopper:', error); // Log the full error details
        res.status(500).json({ message: 'Error creating shopper', error: error.message });
    }
});



// Get all shoppers
app.get('/api/shopper', async (req, res) => {
    try {
        const shoppers = await Shopper.find();
        res.json(shoppers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shoppers', error });
    }
});

// Get a single shopper by ID
app.get('/api/shopper/:id', async (req, res) => {
    try {
        const shopper = await Shopper.findById(req.params.id);
        if (!shopper) return res.status(404).json({ message: 'Shopper not found' });
        res.json(shopper);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shopper', error });
    }
});

// Update a shopper by ID
app.put('/api/shopper/:id', async (req, res) => {
    try {
        const updatedShopper = await Shopper.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedShopper) return res.status(404).json({ message: 'Shopper not found' });
        res.json(updatedShopper);
    } catch (error) {
        res.status(500).json({ message: 'Error updating shopper', error });
    }
});

// Delete a shopper by ID
app.delete('/api/shopper/:id', async (req, res) => {
    try {
        const deletedShopper = await Shopper.findByIdAndDelete(req.params.id);
        if (!deletedShopper) return res.status(404).json({ message: 'Shopper not found' });
        res.json({ message: 'Shopper deleted', deletedShopper });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shopper', error });
    }
});

// Create a new product
app.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
});

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Get a single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
});

// Update a product by ID
app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
});

// Delete a product by ID
app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted', deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

// Create a new cart item
app.post('/api/cart', async (req, res) => {
    try {
        const cartItem = new Cart(req.body);
        const savedCartItem = await cartItem.save();
        res.status(201).json(savedCartItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
});

// Get all cart items
app.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items', error });
    }
});

// Update a cart item by ID
app.put('/api/cart/:id', async (req, res) => {
    try {
        const updatedCartItem = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCartItem) return res.status(404).json({ message: 'Cart item not found' });
        res.json(updatedCartItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart item', error });
    }
});

// Delete a cart item by ID
app.delete('/api/cart/:id', async (req, res) => {
    try {
        const deletedCartItem = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedCartItem) return res.status(404).json({ message: 'Cart item not found' });
        res.json({ message: 'Cart item deleted', deletedCartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart item', error });
    }
});

// Create a new return request
app.post('/api/returns', async (req, res) => {
    try {
        const returnRequest = new Return(req.body);
        const savedReturn = await returnRequest.save();
        res.status(201).json(savedReturn);
    } catch (error) {
        res.status(500).json({ message: 'Error processing return', error });
    }
});

// Get all returns
app.get('/api/returns', async (req, res) => {
    try {
        const returns = await Return.find();
        res.json(returns);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching returns', error });
    }
});

// Get a single return by ID
app.get('/api/returns/:id', async (req, res) => {
    try {
        const returnRequest = await Return.findById(req.params.id);
        if (!returnRequest) return res.status(404).json({ message: 'Return not found' });
        res.json(returnRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching return', error });
    }
});

// Update a return request by ID
app.put('/api/returns/:id', async (req, res) => {
    try {
        const updatedReturn = await Return.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReturn) return res.status(404).json({ message: 'Return not found' });
        res.json(updatedReturn);
    } catch (error) {
        res.status(500).json({ message: 'Error updating return', error });
    }
});

// Delete a return request by ID
app.delete('/api/returns/:id', async (req, res) => {
    try {
        const deletedReturn = await Return.findByIdAndDelete(req.params.id);
        if (!deletedReturn) return res.status(404).json({ message: 'Return not found' });
        res.json({ message: 'Return deleted', deletedReturn });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting return', error });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
