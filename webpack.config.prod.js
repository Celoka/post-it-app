const path = require('path');
const webpack = require('webpack');
const DotEnvPlugin = require('dotenv-webpack');

const dotEnvPlugin = new DotEnvPlugin({
  path: './.env',
});
const config = {
  entry: [
    path.join(__dirname, 'client/src/index.js')
  ],
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    dotEnvPlugin
  ],
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
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader']
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
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

module.exports = config;
