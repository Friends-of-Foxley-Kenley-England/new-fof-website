import * as React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import DeprecatedSeoComponent from "../components/deprecated-seo-component";
import * as style from "./blog-post.module.css";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { contentfulRenderingOptions } from "../helpers/contentful-rendering-options";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulNews;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    // <script src="https://assets.what3words.com/sdk/v3/what3words.js"></script>
    <Layout location={location} title={siteTitle}>
      <DeprecatedSeoComponent
        title={post.title}
        // description={post.newsContent.raw || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="https://schema.org/Article">
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
    site {
      siteMetadata {
        title
      }
    }
    contentfulNews(id: { eq: $id }) {
      id
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
