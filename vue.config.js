const path = require('path');
const pages = require('./pages/pages.js');

module.exports = {
  configureWebpack: {
    mode: 'development',
    entry: './src/main.js',
    plugins: [
      ...pages,
    ],
  },
  outputDir: path.resolve(__dirname, '../alpha/src/main/resources/static'),
}
