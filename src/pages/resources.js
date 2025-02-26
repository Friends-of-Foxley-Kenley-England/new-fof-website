import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import DeprecatedSeoComponent from "../components/deprecated-seo-component";
import * as style from "./resources.module.css";

const ResourcesIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  const resourcesPageData = data.allContentfulResourcesPage?.nodes?.[0] || {};

  return (
    <Layout location={location} title={siteTitle}>
      <DeprecatedSeoComponent title="Resources" />
      <h1>{resourcesPageData.title}</h1>

      <p>{resourcesPageData?.subTitle}</p>

      <div className={style.fileListContainer}>
        {/* https://stackoverflow.com/questions/13354578/custom-li-list-style-with-font-awesome-icon */}
        {/* <FontAwesomeIcon icon="fa-regular fa-file" /> */}
        {/* <FontAwesomeIcon icon="fa-solid fa-file-image" /> */}
        {/* <FontAwesomeIcon icon="fa-regular fa-file-lines" /> */}
        {/* <FontAwesomeIcon icon="fa-solid fa-file-pdf" /> */}
        <ul className={style.pdfFileList}>
          {resourcesPageData?.resourceFiles?.map(resourceFile => {
            return (
              <li className={style.linkText} key={resourceFile.id}>
                <a href={resourceFile.url} className={style.linkText}>
                  {resourceFile.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default ResourcesIndex;

export const pageQuery = graphql`
  query ResourcesPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulResourcesPage {
      nodes {
        title
        subTitle
        id
        resourceFiles {
          id
          file {
            contentType
            fileName
          }
          description
          title
          url
        }
      }
    }
  }
`;
