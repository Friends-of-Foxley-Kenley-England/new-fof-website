import { graphql } from "gatsby";
import Layout from "../components/layout";
import * as style from "./resources.module.css";
import Seo from "../components/seo";
import { GetIconForFiletype } from "../helpers/get-icon-for-filetype";

const ResourcesIndex = ({ data, location }) => {
  const resourcesPageData = data.allContentfulResourcesPage?.nodes?.[0] || {};

  return (
    <Layout location={location}>
      <h1>{resourcesPageData.title}</h1>

      <p>{resourcesPageData?.subTitle}</p>

      <div className={style.fileListContainer}>
        <ul className={style.fileIconItem}>
          {resourcesPageData?.resourceFiles?.map(resourceFile => {
            const icon = GetIconForFiletype(resourceFile.file?.contentType);
            return (
              <li
                className={style.linkText}
                key={resourceFile.id}
                style={{ listStyleImage: `url(${icon})` }}>
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

export function Head({ location }) {
  return <Seo title="Resources" pathname={location?.pathname} />;
}
