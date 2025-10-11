// Import global styles from Gatsby
import "typeface-montserrat";
import "typeface-merriweather";
import "../src/normalize.css";
import "../src/style.variables.css";
import "../src/style.css";
import "prismjs/themes/prism.css";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
