const path = require("path");
const pages = require("./pages/pages.js");

module.exports = {
  configureWebpack: {
    mode: "development",
    entry: "./src/main.js",
    plugins: [...pages],
  },
  outputDir: path.resolve(__dirname, "../alpha/src/main/resources/static"),
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/helpers/_helpers.scss";`,
      },
    },
  },
};
