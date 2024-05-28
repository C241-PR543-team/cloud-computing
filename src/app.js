const express = require('express')

const app = express()
const port = process.env.PORT || 9000;

// Import the routes
const routes = require('./routes');

// Middleware
app.use(express.json());

// Use the imported routes
app.use('/', routes);

// Start the server
app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})