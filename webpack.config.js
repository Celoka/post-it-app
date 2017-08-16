const path = require('path');

const config = {
  entry: path.join(__dirname, 'client/src/index.js'),

  output: {

    path: path.join(__dirname, 'client/app/js'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: './client/app/js',
    inline: true,
    hot: true,
    port: 8081,
    historyApiFallback: true
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};

module.exports = config;
