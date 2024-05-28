const express = require('express')
const app = express()
const routes = require('./routes');

// Middleware
app.use(express.json());

app.use('/', routes);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})