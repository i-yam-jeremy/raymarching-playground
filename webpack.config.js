const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: [{
          loader: "@icetee/handlebars-loader",
        }]
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
