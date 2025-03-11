import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import DeprecatedSeoComponent from "../components/deprecated-seo-component";
import * as style from "./posts.module.css";

const WorkDaysIndex = ({ data, location }) => {
  const posts = data.allContentfulWorkDay.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <DeprecatedSeoComponent title="Volunteer workdays" />
        <p>No news posts found. Add posts to contentful.</p>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      <DeprecatedSeoComponent title="Work Days and Volunteering" />

      <h1>Work Days and Volunteering</h1>

      <p>
        All are welcome and any time you can give on the day will be most
        appreciated.
      </p>
      <p>
        Tools and equipment are provided, but please wear appropriate clothes
        and footwear and bring your own refreshments.
      </p>
      <p>
        We usually meet at 11am on the{" "}
        <strong>second Sunday of the month</strong> and 10am on the{" "}
        <strong>last Wednesday of the month</strong>.
      </p>
      <p>
        Please contact{" "}
        <Link to="/contact/#secretary-and-membership">Chris Parker</Link> for
        details, for each workday, of where and when we will meet or to be added
        to the list of email addresses to be advised.
      </p>

      <h2>Dates:</h2>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title;

          return (
            <li key={post.slug}>
              <article
                className={style.postListItem}
                itemScope
                itemType="https://schema.org/Article">
                <header>
                  <h3>
                    <Link to={"/work-days/" + post.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h3>
                </header>
                <section>
                  <p itemProp="description">{post.shortDescriptionOfWorkday}</p>
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default WorkDaysIndex;

export const pageQuery = graphql`
  {
    allContentfulWorkDay(sort: { dateOfWorkday: DESC }, limit: 15) {
      nodes {
        slug
        createdAt
        id
        title
        shortDescriptionOfWorkday
      }
    }
  }
`;
