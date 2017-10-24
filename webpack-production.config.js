import path from 'path';
import webpack from 'webpack';
import DotEnvPlugin from 'dotenv-webpack';

const debug = process.env.NODE_ENV !== 'production';

const dotEnvPlugin = new DotEnvPlugin({
  path: './.env',
});
const config = {
  entry: [
    path.join(__dirname, 'client/src/index.js'),
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ],
  devtool: debug ? 'source-map' : '',
  output: {
    path: path.join(__dirname, 'client/app/js'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    // Define production build to allow React tto strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
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
};

module.exports = config;
