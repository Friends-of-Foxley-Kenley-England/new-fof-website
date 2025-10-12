const React = require("react");

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

    // Remove existing CSS rules and add custom ones with camelCase support
    config.module.rules = config.module.rules.filter(rule => {
      if (!rule.test) return true;
      const testString = rule.test.toString();
      // Remove CSS-related rules
      return !testString.includes(".css");
    });

    // Add CSS module rule with camelCase (for .module.css files)
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              auto: true,
              exportLocalsConvention: "camelCase",
              namedExport: false,
            },
            importLoaders: 1,
          },
        },
      ],
    });

    // Add regular CSS rule (for non-module .css files)
    config.module.rules.push({
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: ["style-loader", "css-loader"],
    });

    // Use correct react-dom depending on React version.
    if (parseInt(React.version) <= 18) {
      config.externals = ["react-dom/client"];
    }

    config.resolve.mainFields = ["browser", "module", "main"];
    return config;
  },
};
