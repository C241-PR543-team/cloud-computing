const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello, Express!');
});

router.post('/login', (req, res) => {
    
});

router.post('/register', (req, res) => {

});

router.post('/logout', (req, res) => {

});

// Export the router
module.exports = router;