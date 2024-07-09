const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(bodyParser.json());

const apiKey = process.env.API_KEY;

async function fetchIpAddressData(param) {

}

app.get('/:IPAddress', async (req, res) => {
    const ipAddress = req.params.IPAddress;
    try {
        const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to propagate it to the caller
    }
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
