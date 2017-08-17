import path from 'path';
import webpack from 'webpack';

const config = {

  entry: [
    path.join(__dirname, 'client/src/index.js'),
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ],
  output: {

    path: path.join(__dirname, 'client/app/js'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
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
        loader: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};

module.exports = config;
