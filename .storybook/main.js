

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  
  // Static assets configuration
  "staticDirs": ["../src/images"],
  
  // Vite configuration
  "viteFinal": (config) => {
    return {
      ...config,
      define: {
        ...config.define,
        global: 'globalThis',
      },
      esbuild: {
        ...config.esbuild,
        jsx: 'automatic',
        jsxImportSource: 'react'
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          'gatsby': require.resolve('./gatsby-mock.jsx'),
          'gatsby-plugin-image': require.resolve('./gatsby-mock.jsx'),
          '../hooks/use-site-metadata': require.resolve('./gatsby-mock.jsx'),
        },
      },
    };
  }
};
export default config;
