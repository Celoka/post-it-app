import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';


import routes from './routesconfig/routes';
import config from '../webpack.config';

const app = express();
const port = process.env.PORT || 8080;
const compiler = webpack(config);
app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}));
app.use(webpackHotMiddleware(compiler));

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
