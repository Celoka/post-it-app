const express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  bodyParser = require('body-parser'),
  routes = require('./routesconfig/routes');
  path = require('path');

const publicPath = express.static(path.join(__dirname, '../client/app/js'));

app.use('/', publicPath);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/app/js/index.html'));
});
app.listen(port);
console.log(`listening on ${port}`);

module.exports = app;
