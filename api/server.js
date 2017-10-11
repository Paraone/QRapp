const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
