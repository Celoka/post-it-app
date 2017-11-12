const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');

const dotEnvPlugin = new DotEnvPlugin({
  path: './.env',
});
const ExtractTextPluginConfig = new ExtractTextPlugin('main.css');

const config = {
  entry: [
    path.join(__dirname, 'client/src/index.js'),
    path.join(__dirname, 'client/app/css/style.scss'),
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ],
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    inline: true,
    hot: true,
    historyApiFallback: true
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
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
    new webpack.HotModuleReplacementPlugin(),
    dotEnvPlugin,
    ExtractTextPluginConfig
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
