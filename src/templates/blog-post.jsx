import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import * as style from "./blog-post.module.css";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { contentfulRenderingOptions } from "../helpers/contentful-rendering-options";
import { useContentfulLivePreview } from "../hooks/use-contentful-live-updates";

const BlogPostTemplate = ({ data, location }) => {
  // Enable live preview updates
  const liveData = useContentfulLivePreview(data);
  const post = liveData.contentfulNews;
  const { previous, next } = liveData;

  return (
    // <script src="https://assets.what3words.com/sdk/v3/what3words.js"></script>
    <Layout location={location}>
      <article
        className="blog-post"
        itemScope
        itemType="https://schema.org/Article"
      >
        <header>
          <h1 className={style.blogPostHeader} itemProp="headline">
            {post.title}
          </h1>
          <p className={style.blogPostPostedDate}>
            {post.createdAt}, by {post.author}
          </p>
        </header>
        <section itemProp="articleBody" className={style.articleBody}>
          {post?.newsContent &&
            renderRichText(
              post.newsContent,
              contentfulRenderingOptions(style.imgPadding),
            )}
        </section>
        <hr className={style.spacer} />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className={style.blogPostNav}>
        <ul className={style.blogPostNavLinks}>
          <li>
            {previous && (
              <Link to={"/news/" + previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/news/" + next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    contentfulNews(id: { eq: $id }) {
      id
      contentful_id
      sys {
        contentType {
          sys {
            id
          }
        }
      }
      title
      author
      createdAt(formatString: "Do MMMM YYYY")
      newsContent {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData
          }
          title
        }
      }
      shortDescription
    }
    previous: contentfulNews(id: { eq: $previousPostId }) {
      slug
      title
    }
    next: contentfulNews(id: { eq: $nextPostId }) {
      slug
      title
    }
  }
`;

export function Head({ data, location }) {
  const post = data?.contentfulNews;

  return (
    <Seo
      title={post?.title}
      description={post?.shortDescription}
      pathname={location?.pathname}
      noIndex
    />
  );
}
