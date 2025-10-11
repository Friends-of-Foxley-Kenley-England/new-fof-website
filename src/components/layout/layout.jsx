import { useStaticQuery, graphql } from "gatsby";
import * as style from "./layout.module.css";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import HeroSection from "../hero-section";

const Layout = ({ location, children, showHeroSection = false }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
    }
  `);

  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div className={style.layout}>
      <header>
        <SiteHeader
          menuLinks={data?.site?.siteMetadata?.menuLinks}
          siteTitle={data?.site?.siteMetadata?.title}
        />
      </header>

      {showHeroSection && (
        <HeroSection title={data?.site?.siteMetadata?.title} />
      )}

      <div className={style.globalWrapper} data-is-root-path={isRootPath}>
        <main>{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
};

export default Layout;
