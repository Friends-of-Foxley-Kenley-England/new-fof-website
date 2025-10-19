// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";
// normalize CSS across browsers
import "./src/normalize.css";
// custom CSS styles
import "./src/style.variables.css";
import "./src/style.css";

// Highlighting for code blocks
import "prismjs/themes/prism.css";

// Contentful Live Preview
import { ContentfulLivePreviewProvider } from "./src/contexts/ContentfulLivePreviewProvider";

export const wrapRootElement = ({ element }) => {
  return <ContentfulLivePreviewProvider>{element}</ContentfulLivePreviewProvider>;
};
