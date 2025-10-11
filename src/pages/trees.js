import { Link } from "gatsby";
import Layout from "../components/layout";
import ExternalLink from "../components/external-link.jsx";
import Seo from "../components/seo";

const TreesIndex = ({ location }) => {
  return (
    <Layout location={location}>
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
          <ExternalLink
            href="https://en.wikipedia.org/wiki/Beech"
            aria-label="Visit Beech Wikipedia page">
            Beech
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://en.wikipedia.org/wiki/Fraxinus"
            aria-label="Visit Ash Wikipedia page">
            Ash
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://en.wikipedia.org/wiki/Sycamore"
            aria-label="Visit Sycamore tree Wikipedia page">
            Sycamore
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://en.wikipedia.org/wiki/Juniper"
            aria-label="Visit Juniper tree Wikipedia page">
            Juniper
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://en.wikipedia.org/wiki/Hazel"
            aria-label="Visit Hazel tree Wikipedia page">
            Hazel
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://en.wikipedia.org/wiki/Yew"
            aria-label="Visit Yew tree Wikipedia page">
            Yew
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://en.wikipedia.org/wiki/Hornbeam"
            aria-label="Visit Hornbeam tree Wikipedia page">
            Hornbeam
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://en.wikipedia.org/wiki/Whitebeam"
            aria-label="Visit Whitebeam tree Wikipedia page">
            Whitebeam
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://en.wikipedia.org/wiki/Holly"
            aria-label="Visit Holly tree Wikipedia page">
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

export function Head({ location }) {
  return (
    <Seo title="Trees in Foxley Woods" pathname={location?.pathname} noIndex />
  );
}
