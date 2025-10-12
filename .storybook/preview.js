// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";
// normalize CSS across browsers
import "../src/normalize.css";
// custom CSS styles
import "../src/style.variables.css";
import "../src/style.css";

// Highlighting for code blocks
import "prismjs/themes/prism.css";

import { INITIAL_VIEWPORTS } from "storybook/viewport";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  initialGlobals: {
    viewport: { value: "ipad", isRotated: false },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#333333",
        },
      ],
    },
    docs: {
      codePanel: true,
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
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
