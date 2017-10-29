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
import config from '../webpack.config';
import getCurrentUser from './middlewares/auth';

const app = express();
const port = process.env.PORT || 8000;
const compiler = webpack(config);
const publicPath = express.static(path.join(__dirname, '../client/app/js'));
/**
 * @type
 * @returns current signup user
 */

app.use((req, res, next) => {
  getCurrentUser().then((user) => {
    req.user = user;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, ' +
         'content-type, Authorization');
    next();
  });
});

app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  stats: { colors: true }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(webpackHotMiddleware(compiler));
app.use('/', publicPath);

app.use(routes);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/app/js/index.html'));
});

app.listen(port);
console.log(`listening on ${port}`);
export default app;
