const gatsby = require("eslint-plugin-gatsby");

module.exports = [
  {
    files: ["**/*.{js,jsx}"],
    ignores: [
      ".cache/*",
      ".storybook/*",
      ".yarn/*",
      "build/*",
      "config/*",
      "coverage/*",
      "dist/*",
      "node_modules/*",
      "public/*",
    ],
    plugins: {
      gatsby,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
    },
    rules: {
      ...gatsby.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
