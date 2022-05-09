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
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       sassOptions: {
  //         data: `@import "@/assets/scss/variables/_variables.scss";`
  //       },
  //     },
  //   },
  // },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variables/_variables.scss";`
      },
    }
  }
}
