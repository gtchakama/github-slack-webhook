const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // parse JSON payloads

// Set up routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
