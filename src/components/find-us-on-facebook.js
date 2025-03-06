import { useStaticQuery, graphql } from "gatsby";
import * as style from "./find-us-on-facebook.module.css";
import ExternalLink from "./external-link";
import { StaticImage } from "gatsby-plugin-image";

const alt = "find us on facebook";
const loading = "lazy";
const objectFit = "contain";
const placeholder = "dominantColor";

const BlueFacebookImage = () => {
  return (
    <StaticImage
      src="../images/facebook/FindUs-FB-RGB.svg"
      alt={alt}
      className={style.facebookImage}
      loading={loading}
      objectFit={objectFit}
      placeholder={placeholder}
    />
  );
};

const WhiteFacebookImage = () => {
  return (
    <StaticImage
      src="../images/facebook/FindUs-FB-RGB-Wht.svg"
      alt={alt}
      className={style.facebookImage}
      loading={loading}
      objectFit={objectFit}
      placeholder={placeholder}
    />
  );
};

const FindUsOnFacebook = ({ useWhiteGraphic }) => {
  const data = useStaticQuery(graphql`
    query FindUsOnFacebookQuery {
      site {
        siteMetadata {
          social {
            facebook
          }
        }
      }
    }
  `);

  const facebookLink = data.site.siteMetadata?.social?.facebook;

  const FindeUsOnFacebookImage = useWhiteGraphic ? (
    <WhiteFacebookImage />
  ) : (
    <BlueFacebookImage />
  );

  return (
    <ExternalLink href={facebookLink}>{FindeUsOnFacebookImage}</ExternalLink>
  );
};

export default FindUsOnFacebook;
