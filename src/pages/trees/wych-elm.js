import Layout from "../../components/layout";
import ExternalLink from "../../components/external-link";
import Seo from "../../components/seo";

const Index = ({ location }) => {
  return (
    <Layout location={location}>
      <h1>Wych Elm Tree</h1>
      <h2>Other names - Ulmus glabra, Scots elm</h2>
      <p>
        There are only three known individuals of original trees in Foxley, and
        two of these are in fact in Sherwood Oaks Field, at the pond end, near
        the path up and down between the kissing gates. The one in the wood
        itself is just below the top path about mid way along. We have planted a
        number of whips, in sunnier areas both around the field margins and in
        areas that were coppiced below the bottom path. They are especially
        valued because Elms are the host plant for the White Letter Hairstreak
        [WHL] butterfly, which with the demise of almost all Elms has become
        very rare. Though susceptible to Dutch Elm disease, they have the same
        terpinoid chemical [though less of it] in their bark that makes them
        unpalatable to the bark beetle as the European White Elm, Ulmus laevis .
      </p>

      <p>
        The butterflies like to be around a sunlit upper canopy, and have been
        observed on the two in the field so the Friends felled two large Ash
        trees in the field that were overshadowing them, and we may fell
        another. They do not naturally regenerate well, they do not sucker from
        roots like other Elms and the seed which is produced in spring after
        early flowering is only viable for a few days. They have probably
        survived in Foxley because of their relative isolation from other Elms,
        though recently one of our butterfly recorders found a whole row of them
        in nearby Foxley Road. A visiting expert from Butterfly Conservation
        also recently [2019] found WHL eggs on twigs of one of the trees in the
        field, to our delight.
      </p>
      <p>
        Written by <strong>Anthony Mills, Dip.Hort[RHS]</strong>; Tech Arbor.A..
        Arboricultural Advisor for Friends of Foxley.
      </p>

      <p>
        Read more about the Wych Elm{" "}
        <ExternalLink
          href="https://en.wikipedia.org/wiki/Ulmus_glabra"
          aria-label="Visit Wych Elm tree Wikipedia page">
          here
        </ExternalLink>
      </p>
    </Layout>
  );
};

export default Index;

export function Head({ location }) {
  return <Seo title="Wych Elm Tree" pathname={location?.pathname} noIndex />;
}
