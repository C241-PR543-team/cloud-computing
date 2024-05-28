const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello, Express!');
});

router.get('/about', (req, res) => {
    res.send('About Us');
});

// Export the router
module.exports = router;