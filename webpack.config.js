const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getFiles = (dir, files_) => {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);

  const fileData = Object.entries(files);

  fileData.forEach((item) => {
    const file = item[1];
    const name = `${dir}/${file}`;

    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  });

  return files_;
};

const CRMpages = getFiles('./dev/templates').map((name) => {
  const filename = `../${name.split('dev/').splice(1, name.split('dev/').length - 1).join('')}`;

  return new HTMLWebpackPlugin({
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

module.exports = {
  mode: 'production',
  entry: './dev/static/js/platform/Iplatform.js',
  output: {
    path: path.resolve(__dirname, '../alpha/src/main/resources/static'),
    filename: 'js/platform/[name]-bundle.js',
  },
  plugins: [
    ...CRMpages,
    new MiniCssExtractPlugin({
      filename: 'css/platform/platform.css',
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(?:|gif|png|jpg|svg)$/,
        generator: {
          filename: () => {
            return 'img/[name][ext]';
          },
        },
      },
      {
        test: /\.(?:eot|ttf|woff|woff2|otf)$/,
        generator: {
          filename: () => {
            return 'fonts/[name][ext]';
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 244000,
    },
  },
};
