const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI = "mongodb://localhost:27017/storefront";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// MongoDB Schemas and Models
const BillingSchema = new mongoose.Schema({
    name: String,
    address: String,
    payment: String,
});

const ReturnSchema = new mongoose.Schema({
    productName: String,
});

const Billing = mongoose.model("Billing", BillingSchema);
const Return = mongoose.model("Return", ReturnSchema);

// API Endpoints
app.post("/api/billing", async (req, res) => {
    try {
        const newBilling = new Billing(req.body);
        await newBilling.save();
        res.status(200).send("Billing information saved successfully.");
    } catch (err) {
        res.status(500).send("Error saving billing information.");
    }
});

app.post("/api/returns", async (req, res) => {
    try {
        const newReturn = new Return(req.body);
        await newReturn.save();
        res.status(200).send("Return request saved successfully.");
    } catch (err) {
        res.status(500).send("Error saving return request.");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
