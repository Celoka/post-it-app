const express = require('express'),
  app = express(),
  port = process.env.PORT || 6969,
  bodyParser = require('body-parser'),
  routes = require('./routesconfig/routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Welcome to Post IT!');
});

app.use(routes);
app.listen(port);
console.log(`listening on ${port}`);

module.exports = app;
