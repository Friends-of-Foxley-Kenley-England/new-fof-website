// cypress.config.js
const { defineConfig } = require("cypress");
const webpackConfig = require("./cypress/webpack.config");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig,
    },
    // Make sure React is properly set up
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
