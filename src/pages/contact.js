import { graphql } from "gatsby";
import Layout from "../components/layout";
import DeprecatedSeoComponent from "../components/deprecated-seo-component";
import * as style from "./contact.module.css";
import FindUsOnFacebook from "../components/find-us-on-facebook";

const ContactIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const contactDetails = data?.allContentfulContactDetails?.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <DeprecatedSeoComponent title="Contact" />
      <h1>Contact us</h1>
      <div className={style.facebookSpacing}>
        <FindUsOnFacebook useWhiteGraphic={false} />
      </div>
      <p>
        If you would like any further information regarding the work of the
        Friends of Foxley in Foxley Wood or if you would like to help preserve
        this local nature reserve then contact us now:
      </p>

      {contactDetails?.map(x => {
        const contact = x?.node || {};

        const { id, name, email, telephone, role, displayOrder } = contact;

        return (
          <section className={style.contact} key={displayOrder || id}>
            {role && <h2>{role}</h2>}

            {name && <p>{name}</p>}

            {email && (
              <p>
                <a href={`mailto:${email}`} rel="noopener noreferrer">
                  {email}
                </a>
              </p>
            )}

            {telephone && <a href={`tel:${telephone}`}>{telephone}</a>}
          </section>
        );
      })}
    </Layout>
  );
};

export default ContactIndex;

export const pageQuery = graphql`
  query ContactDetails {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulContactDetails(sort: { displayOrder: ASC }) {
      edges {
        node {
          id
          displayOrder
          name
          role
          email
          telephone
        }
      }
    }
  }
`;
