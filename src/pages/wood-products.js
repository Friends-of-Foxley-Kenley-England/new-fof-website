import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";

const Index = ({ location }) => {
  return (
    <Layout location={location}>
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

export function Head() {
  return <Seo title="Wood Products" noIndex />;
}
