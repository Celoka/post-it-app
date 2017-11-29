const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader?importLoaders=1'
        })
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        apiKey: JSON.stringify(process.env.apiKey),
        authDomain: JSON.stringify(process.env.authDomain),
        databaseURL: JSON.stringify(process.env.databaseURL),
        projectId: JSON.stringify(process.env.projectId),
        storageBucket: JSON.stringify(process.env.storageBucket),
        messagingSenderId: JSON.stringify(process.env.messagingSenderId)
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
