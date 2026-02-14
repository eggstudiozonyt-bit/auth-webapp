const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Authentication endpoints
app.post('/api/login', (req, res) => {
    // Handle user login logic here
    res.json({ message: 'Login successful' });
});

app.post('/api/signup', (req, res) => {
    // Handle user signup logic here
    res.json({ message: 'Signup successful' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
