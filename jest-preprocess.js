const babelOptions = {
  presets: [
    "babel-preset-gatsby",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
}

module.exports = require("babel-jest").default.createTransformer(babelOptions)
