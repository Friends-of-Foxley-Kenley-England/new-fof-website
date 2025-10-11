import { graphql } from "gatsby";
import * as page from "../trees/ancient-beech-tree-diversion";
import Seo from "../../components/seo";

/*

    This page exists to preserve a URL from the old website.

    A few leaflets, a QR code and other content may have this url

*/

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default page.default;

export function Head({ location }) {
  return (
    <Seo
      title="Ancient Beech Tree diversion"
      pathname={location?.pathname}
      noIndex
    />
  );
}
