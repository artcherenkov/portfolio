const path = require('path');

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  devServer: {
    contentBase: __dirname,
    open: false,
    port: 9092,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
};
