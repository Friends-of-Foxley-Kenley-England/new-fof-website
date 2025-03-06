import { graphql } from "gatsby";

import Layout from "../components/layout";
import DeprecatedSeoComponent from "../components/deprecated-seo-component";

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title || "Not found";

  return (
    <Layout location={location} title={siteTitle} showHeroSection>
      <DeprecatedSeoComponent title="404: Not Found" />
      <h1>Couldn't find that page</h1>
      <p>Check the URL and try again. Our woods aren't that big!</p>
      <p>{location.pathname}</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
