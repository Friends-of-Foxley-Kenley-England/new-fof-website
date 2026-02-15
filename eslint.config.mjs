import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    ".cache/**",
    ".storybook/**",
    ".yarn/**",
    "build/**",
    "coverage/**",
    "node_modules/**",
    "public/**",
    "storybook-static/**",
  ]),

  // ---------------------------------------------------
  // 📦 Javascript (ES Modules)
  // ---------------------------------------------------
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        __PATH_PREFIX__: "readonly",
      },
    },
  },

  // ---------------------------------------------------
  // 📦 CommonJS
  // ---------------------------------------------------
  {
    files: ["*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // ---------------------------------------------------
  // 📦 CommonJS 
  // ---------------------------------------------------
  {
    files: ["__mocks__/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        jest: "readonly",
      },
    },
  },

  // ---------------------------------------------------
  // 📦 Jest
  // ---------------------------------------------------
  {
    files: ["**/*.test.{js,jsx}", "**/*.spec.{js,jsx}"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        test: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
      },
    },
  },

  // ---------------------------------------------------
  // 📦 React
  // ---------------------------------------------------
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,

      // I would be using typescript insted of using PropTypes
      "react/prop-types": "off",

      // gatsby ensures react is in scope
      "react/react-in-jsx-scope": "off",
    },
  },
]);
