const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'server'),
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '']
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }
      }
    ]
  }
};
