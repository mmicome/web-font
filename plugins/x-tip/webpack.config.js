const path = require('path');

module.exports = {
  entry: './src/tip.js',
  output: {
    filename: 'tip.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env'],
          plugins: []
        }
      }
    }]
  }
};