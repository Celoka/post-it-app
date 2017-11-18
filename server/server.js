/**
 * Import module dependencies
 */
import express from 'express';
import path from 'path';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import routes from './routes/routes';


let configPath;
const environment = process.env.NODE_ENV || 'development';
if (environment === 'production') {
  configPath = '../webpack.config.prod';
} else {
  configPath = '../webpack.config';
}
const config = require(configPath);
const app = express();
const port = process.env.PORT || 8000;
const compiler = webpack(config);
const publicPath = express.static(path.join(__dirname,
   '../client/app/index.html'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(bodyParser.json());


if (environment === 'development') {
  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: { colors: true }
  }));
  app.use(webpackHotMiddleware(compiler));
}
app.use('/', publicPath);

app.use(routes);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/app/index.html'));
});

app.listen(port);
console.log(`listening on ${port}`);
export default app;
