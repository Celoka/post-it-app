import path from 'path';


const config = {

  entry: [
    path.join(__dirname, 'client/src/index.js'),
    'webpack-hot-middleware/client'
  ],
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
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader',
          'babel-loader']
      },
      {
        test: /\.css$/,
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
