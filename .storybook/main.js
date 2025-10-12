const React = require("react");
const webpack = require("webpack");

module.exports = {
  // You will want to change this to wherever your Stories will live
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: "@storybook/react-webpack5",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async config => {
    // Transpile Gatsby modules - modify the SWC loader to include gatsby packages
    config.module.rules.forEach(rule => {
      if (rule.use && Array.isArray(rule.use)) {
        rule.use.forEach(loader => {
          if (loader.loader && loader.loader.includes("swc-loader")) {
            // Update exclude to allow gatsby packages
            rule.exclude = [/node_modules\/(?!(gatsby|gatsby-script)\/).*/];
          }
        });
      }
    });

    // Find and modify Storybook's CSS rule to enable camelCase for modules
    config.module.rules.forEach((rule, index) => {
      // Look for the CSS rule
      if (rule.test && rule.test.toString().includes(".css")) {
        const use = rule.use;
        if (Array.isArray(use)) {
          use.forEach(loaderConfig => {
            if (
              typeof loaderConfig === "object" &&
              loaderConfig.loader &&
              loaderConfig.loader.includes("css-loader")
            ) {
              // Ensure options exist
              if (!loaderConfig.options) {
                loaderConfig.options = {};
              }
              // Enable CSS modules with camelCase
              loaderConfig.options.modules = {
                auto: true, // Auto-enable for .module.css files
                exportLocalsConvention: "camelCase",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              };
            }
          });
        }
      }
    });

    // Provide process global for Gatsby code
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    );

    // Use correct react-dom depending on React version.
    if (parseInt(React.version) <= 18) {
      config.externals = ["react-dom/client"];
    }

    config.resolve.mainFields = ["browser", "module", "main"];
    return config;
  },
};
