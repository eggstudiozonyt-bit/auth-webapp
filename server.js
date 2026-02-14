const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: true }));

let users = [];

// Signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    users.push({ username, password });
    res.status(201).json({ message: 'User signed up successfully' });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        req.session.user = user;
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ message: 'Welcome to your dashboard', user: req.session.user });
    } else {
        res.status(401).json({ message: 'You need to log in first' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});