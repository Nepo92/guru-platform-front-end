const path = require("path");
const pages = require("./pages/pages.ts");

module.exports = {
  configureWebpack: {
    mode: "development",
    entry: "./src/main.ts",
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
