import Layout from "../components/layout";
import Seo from "../components/seo";

const HistoryIndex = ({ location }) => {
  return (
    <Layout location={location}>
      <h1>History of Foxley Wood</h1>
      <p>
        The ancient name FOXLE first appears in the Surrey Assize Rolls of 1279
        but it is not until information from the Messeder map of 1762 and the
        Tithe map of 1837 that the fields, farmlands and woodlands are seen to
        complete the jigsaw that we can identify today, situated between the
        boundaries of the A22 and A23.
      </p>
      <p>
        Ancient Foxle was probably about 200 acres but today the 19 acres of
        Foxley Wood, plus other small strips of woodland and field are all that
        remain.
      </p>
      <p>
        In 1867 the Lords of the Manor started selling off plots of land for
        building development and it was George Armstrong, a prosperous merchant
        and manufacturer of linseed oil cake, who purchased the Great Foxley
        Estate in c1875 and built the large house "Foxley", later to be known as
        Foxley Hall.
      </p>
      <p>
        The estate was again sold in 1893 to Edward Densham, a tea merchant who,
        with his brothers and father John Boon Densham founded the Mazawattee
        tea company.
      </p>
      <p>
        The Foxley estate was finally sold in 1937 to Coulsdon and Purley UDC.
        It is now owned and managed by the London Borough of Croydon, so
        preserving this lovely stretch of old woodland in the green belt scheme
        now designated as a Local Nature Reserve.
      </p>
      <p>
        The Friends of Foxley volunteer group were founded in 1992 to work in
        partnership with the London Borough of Croydon to maintain, enhance and
        manage Foxley Wood for the benefit of local residents and visitors.
      </p>
    </Layout>
  );
};

export default HistoryIndex;

export function Head({ location }) {
  return <Seo title="History of Foxley Woods" pathname={location?.pathname} />;
}
