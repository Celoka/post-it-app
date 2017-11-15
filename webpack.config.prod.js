const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ExtractTextPluginConfig = new ExtractTextPlugin('main.css');
const config = {
  entry: [
    path.join(__dirname, 'client/src/index.js'),
    path.join(__dirname, 'client/app/css/style.scss')
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader?importLoaders=1' })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
  plugins: [
    ExtractTextPluginConfig,
    new DotEnv({
      path: '.env',
      safe: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
};

module.exports = config;
