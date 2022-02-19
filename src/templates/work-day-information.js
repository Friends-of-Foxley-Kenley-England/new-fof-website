import * as React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { What3wordsAddress } from "@what3words/react-components";
import * as style from "./work-day-information.module.css";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const WorkDayTemplate = ({ data, location }) => {
  const post = data.contentfulWorkDay;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.title} description={post.description || post.excerpt} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{"Work day: " + post.title}</h1>
        </header>
        <section
          // dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody">
          {renderRichText(post.workDayInformation)}
          {/* {post.workDayInformation.raw} */}
        </section>
        <section>
          <h2 itemProp="headline">Time</h2>
          <p>{post.meetingTime}</p>

          <h2 itemProp="headline">Location</h2>
          <p>{post.meetingPointDescription}</p>
          <What3wordsAddress
            words={post.meeting_point_what3words}
            icon-color="#0e4630"
            text-color="#0e4630"
            tooltip-location={post.meeting_point_what3words}
            rel="noopener noreferrer"
          />
        </section>

        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}>
          <li>
            {previous && (
              <Link to={"/work-days/" + previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/work-days/" + next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default WorkDayTemplate;

export const pageQuery = graphql`
  query WorkDayBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulWorkDay(id: { eq: $id }) {
      id
      title
      dateOfWorkday
      meetingPointDescription
      meetingTime
      shortDescriptionOfWorkday
      workDayInformation {
        raw
      }
    }
    previous: contentfulWorkDay(id: { eq: $previousPostId }) {
      slug
      title
    }
    next: contentfulWorkDay(id: { eq: $nextPostId }) {
      slug
      title
    }
  }
`;
