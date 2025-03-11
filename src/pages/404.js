import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location} showHeroSection>
      <h1>Couldn't find that page</h1>
      <p>Check the URL and try again. Our woods aren't that big!</p>
      <p>{location.pathname}</p>
    </Layout>
  );
};

export default NotFoundPage;

export function Head() {
  return <Seo title="404: Not Found" />;
}
