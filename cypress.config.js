// cypress.config.js
const { defineConfig } = require("cypress");
const webpackConfig = require("./cypress/webpack.config");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: {
        // Add CSS modules support
        module: {
          rules: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    "@babel/preset-env",
                    "@babel/preset-react",
                    "babel-preset-gatsby",
                  ],
                },
              },
            },
            {
              test: /\.module\.css$/,
              use: [
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 1,
                    modules: {
                      localIdentName: "[name]__[local]__[hash:base64:5]",
                    },
                  },
                },
              ],
              include: /\.module\.css$/,
            },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
              exclude: /\.module\.css$/,
            },
          ],
        },
      },
    },
    // Make sure React is properly set up
    setupNodeEvents(on, config) {
      return config;
    },
  },

  e2e: {
    baseUrl: "https://www.friendsoffoxley.co.uk",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
