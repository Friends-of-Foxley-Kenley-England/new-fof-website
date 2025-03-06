import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import DeprecatedSeoComponent from "../components/deprecated-seo-component";
import ExternalLink from "../components/external-link";

const TreesIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <DeprecatedSeoComponent title="Trees" />
      <h1>Trees of Foxley Wood</h1>

      <p>
        Here are the most prominent trees that make Foxley Wood such a special
        Local Nature Reserve.
      </p>

      <ul>
        <li>
          <Link to="/trees/english-oak">English Oak</Link>
        </li>
        <li>
          <Link to="wych-elm">Wych Elm</Link>
        </li>
        <li>
          <ExternalLink href="https://en.wikipedia.org/wiki/Beech">
            Beech
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://en.wikipedia.org/wiki/Fraxinus">
            Ash
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://en.wikipedia.org/wiki/Sycamore">
            Sycamore
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://en.wikipedia.org/wiki/Juniper">
            Juniper
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://en.wikipedia.org/wiki/Hazel">
            Hazel
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://en.wikipedia.org/wiki/Yew">
            Yew
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://en.wikipedia.org/wiki/Hornbeam">
            Hornbeam
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://en.wikipedia.org/wiki/Whitebeam">
            Whitebeam
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://en.wikipedia.org/wiki/Holly">
            Holly
          </ExternalLink>
        </li>
      </ul>

      <p>
        We've currently got a diversion around our{" "}
        <Link to="ancient-beech-tree-diversion">Ancient Beech tree</Link>.
      </p>
    </Layout>
  );
};

export default TreesIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
