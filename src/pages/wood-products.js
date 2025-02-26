import * as React from "react";
import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import DeprecatedSeoComponent from "../components/deprecated-seo-component";

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <DeprecatedSeoComponent title="Wood Products" />
      <h1>Wood Products</h1>

      <p>
        Wood for turning and other projects is sometimes available - if you are
        interested in that please contact{" "}
        <Link to="/contact/#secretary-and-membership">Chris Parker</Link>.
      </p>
      <p>
        Seasoned hardwood firewood is normally available throughout the winter.
        It comes split and ready to burn in good sized bags. Please speak to{" "}
        <strong>Alison</strong>.
      </p>

      <p>
        We do request a donation because this is our only source of regular
        funds.
      </p>

      <p>
        Phone numbers and emails are on the <Link to="/contact">contact</Link>{" "}
        page.
      </p>
      <StaticImage src="../images/firewood.jpeg" alt="Bags of firewood" />
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
