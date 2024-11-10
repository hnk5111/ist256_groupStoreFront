const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to handle billing information
app.post('/api/billing', (req, res) => {
    const billingInfo = req.body;
    console.log("Billing info received:", billingInfo);
    // Process billing information here, such as saving to a database
    res.status(200).send("Billing info received");
});

// Endpoint to handle return requests
app.post('/api/returns', (req, res) => {
    const returnInfo = req.body;
    console.log("Return request received:", returnInfo);
    // Process return request here, such as updating the database or handling refunds
    res.status(200).send("Return request received");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
