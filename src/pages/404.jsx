import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location} showHeroSection>
      <h1>Couldn&apos;t find that page</h1>
      <p>Check the URL and try again. Our woods aren&apos;t that big!</p>
      <p>{location.pathname}</p>
    </Layout>
  );
};

export default NotFoundPage;

export function Head({ location }) {
  return <Seo title="404: Not Found" pathname={location?.pathname} />;
}
