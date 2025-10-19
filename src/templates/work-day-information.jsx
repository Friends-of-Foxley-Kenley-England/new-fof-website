import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { What3wordsAddress } from "@what3words/react-components";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { parseMeetingPoint } from "../helpers/parse-meeting-point";
import * as style from "./work-day-information.module.css";
import { contentfulRenderingOptions } from "../helpers/contentful-rendering-options";
import { useContentfulLivePreview } from "../hooks/use-contentful-live-updates";

const WorkDayTemplate = ({ data, location }) => {
  // Enable live preview updates
  const liveData = useContentfulLivePreview(data);
  const post = liveData.contentfulWorkDay;
  const { previous, next } = liveData;
  const meetingPoint = parseMeetingPoint(post.meetingPointWhat3words);

  const meetingPointWhatThreeWords = meetingPoint?.meetingPointWhatThreeWords;
  const meetingPointDescription = meetingPoint?.meetingPointDescription;

  return (
    <Layout location={location}>
      <article
        className="blog-post"
        itemScope
        itemType="https://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{"Work day: " + post.title}</h1>
        </header>
        <section itemProp="articleBody">
          {post?.workDayInformation &&
            renderRichText(
              post.workDayInformation,
              contentfulRenderingOptions(style.imgPadding),
            )}
        </section>
        <section>
          <h2 itemProp="headline">Time</h2>
          <p>{post.meetingTime}</p>

          <h2 itemProp="headline">Location</h2>
          <p className={style.description}>{meetingPointDescription}</p>

          {meetingPointWhatThreeWords && (
            <What3wordsAddress
              words={meetingPointWhatThreeWords}
              icon-color="#0e4630"
              text-color="#0e4630"
              tooltip-location={meetingPointDescription}
              rel="noopener noreferrer"
            />
          )}
        </section>

        <footer className={style.footer}>
          <hr />
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
          }}
        >
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
    contentfulWorkDay(id: { eq: $id }) {
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
      dateOfWorkday
      meetingTime
      meetingPointWhat3words
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

export function Head({ data, location }) {
  const post = data?.contentfulWorkDay;

  return (
    <Seo
      title={`Volunteer work day ${post?.title}`}
      description={`Volunteer work day: ${post?.shortDescriptionOfWorkday}`}
      pathname={location?.pathname}
      noIndex
    />
  );
}
