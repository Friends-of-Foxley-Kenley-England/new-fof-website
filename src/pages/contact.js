import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import * as style from "./contact.module.css";
import FindUsOnFacebook from "../components/find-us-on-facebook";

const ContactIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Contact" />
      <h1>Contact us</h1>
      <div className={style.facebookSpacing}>
        <FindUsOnFacebook useWhiteGraphic={false} />
      </div>
      <p>
        If you would like any further information regarding the work of the
        Friends of Foxley in Foxley Wood or if you would like to help preserve
        this local nature reserve then contact us now:
      </p>

      <section className={style.contact}>
        <h2> Chairman</h2>
        <p>Andrew Wood</p>
        <a href="mailto:fofchair@gmail.com" rel="noopener noreferrer">
          fofchair@gmail.com
        </a>
      </section>

      <section className={style.contact}>
        <h2>Secretary and Membership</h2>
        <p>Chris Parker</p>
        <p>
          <a
            href="mailto:chrispm_parker@hotmail.co.uk"
            rel="noopener noreferrer">
            chrispm_parker@hotmail.co.uk
          </a>
        </p>

        <a href="tel:02086683302">020 8668 3302</a>
      </section>

      <section className={style.contact}>
        <h2>Treasurer</h2>
        <p>Carl Roche</p>
        <p>
          <a href="mailto:carlroche@freeukisp.co.uk" rel="noopener noreferrer">
            carlroche@freeukisp.co.uk
          </a>
        </p>
        <a href="tel:02086607790">020 8660 7790</a>
      </section>

      <section className={style.contact}>
        <h2>Wood Products</h2>
        <p>Alison Falkner</p>
        <p>
          <a
            href="mailto:alison.falkner@btinternet.com"
            rel="noopener noreferrer">
            alison.falkner@btinternet.com
          </a>
        </p>
        <a href="tel:02086688979">020 8668 8979</a>
      </section>

      <section className={style.contact}>
        <h2>Committee Member for Biodiversity</h2>
        <p>Bill Bessant</p>
      </section>

      <section className={style.contact}>
        <h2>Committee Member</h2>
        <p>Alastair Davis</p>
      </section>
    </Layout>
  );
};

export default ContactIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
