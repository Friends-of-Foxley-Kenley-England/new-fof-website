import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          description
        }
      }
    }
  `);

  const description = data.site.siteMetadata?.description;

  return (
    <div className="bio">{description && <p>{description || null}</p>}</div>
  );
};

export default Bio;
