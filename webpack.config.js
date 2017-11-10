const path = require('path');
const webpack = require('webpack');
const DotEnvPlugin = require('dotenv-webpack');

const dotEnvPlugin = new DotEnvPlugin({
  path: './.env',
});
const config = {
  entry: [
    path.join(__dirname, 'client/src/index.js'),
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ],
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    dotEnvPlugin
  ],
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
    dns: 'empty'
  },
};

module.exports = config;
