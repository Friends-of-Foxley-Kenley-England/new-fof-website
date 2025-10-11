

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "viteFinal": (config) => {
    // Handle Gatsby's global CSS imports and aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Add any Gatsby-specific aliases if needed
    };
    
    // Configure Vite to handle JSX in .js files (like Gatsby does)
    config.esbuild = {
      jsx: 'automatic',
    };
    
    config.optimizeDeps = {
      esbuildOptions: {
        jsx: 'automatic',
        loader: {
          '.js': 'jsx',
        },
      },
    };
    
    return config;
  }
};
export default config;