const path = require("path");

module.exports = {
  mode: "development",
  entry: "./tests.js",
  output: {
    filename: "tests.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
