import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
          locale
          organisationName
          siteUrl
          title
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
