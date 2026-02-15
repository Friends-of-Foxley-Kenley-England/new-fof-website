import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import * as style from "./posts.module.css";

const NewsIndex = ({ data, location }) => {
  const posts = data.allContentfulNews.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <Bio />
        <p>No news posts found. Add posts to contentful.</p>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      <h1>Latest news</h1>

      {posts.map(post => {
        const title = post?.title || post?.fields?.slug || "News article title";

        return (
          <article
            key={post.id}
            className={style.postListItem}
            itemScope
            itemType="https://schema.org/Article"
            id={post.id}
          >
            <header>
              <h2>
                <Link to={"/news/" + post.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h2>
              <small>
                {post.createdAt}
                {post?.author && <span>, by {post.author} </span>}
              </small>
            </header>
            <section>
              <p itemProp="description">{post.shortDescription}</p>
            </section>
          </article>
        );
      })}

      <Bio />
    </Layout>
  );
};

export default NewsIndex;

export const pageQuery = graphql`
  {
    allContentfulNews(sort: { createdAt: DESC }) {
      nodes {
        id
        newsContent {
          raw
        }
        title
        author
        shortDescription
        createdAt(formatString: "Do MMMM YYYY")
        slug
      }
    }
  }
`;

export function Head({ location }) {
  return <Seo title="News" pathname={location?.pathname} />;
}
