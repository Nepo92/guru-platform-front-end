const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const getFiles = (directory) => {
  const { files, dir } = directory;
  
  const filesDir = fs.readdirSync(dir);

  const fileData = Object.entries(filesDir);

  fileData.forEach((item) => {
    const file = item[1];
    const name = `${dir}/${file}`;

    if (fs.statSync(name).isDirectory()) {
      const nestedDirectory = {
        dir,
        files,
      };

      getFiles(nestedDirectory);
    } else {
      files.push(name);
    }
  });

  return files;
};

const pages = getFiles({dir: './src/templates', files: []}).map((name) => {
  const filename = `../${name.split('src/').splice(1, name.split('src/').length - 1).join('')}`;

  return new HtmlWebpackPlugin({
    title: name,
    filename,
    template: name,
    inject: 'body',
    publicPath: '/',
    minify: {
      removeRedundantAttributes: false,
      useShortDoctype: true,
      collapseWhitespace: true,
      keepClosingSlash: true,
    },
  });
});

module.exports = pages;
