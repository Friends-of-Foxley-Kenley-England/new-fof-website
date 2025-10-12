import { memo } from "react";
import * as style from "./site-footer.module.css";
import ExternalLink from "../external-link";

import FindUsOnFacebook from "../find-us-on-facebook";

const SiteFooter = () => (
  <footer className={style.siteFooter}>
    <FindUsOnFacebook useWhiteGraphic={true} />

    <span className={style.builtBy}>
      © {new Date().getFullYear()}, Built with
      {` `}
      <ExternalLink
        href="https://www.gatsbyjs.com"
        className={style.footerLink}
        aria-label="Visit Gatsby website"
      >
        Gatsby
      </ExternalLink>
      {` `}
      by{" "}
      <ExternalLink
        href="https://github.com/eloisetaylor5693"
        className={style.footerLink}
        aria-label="Visit Eloise Taylor's GitHub profile"
      >
        Eloise Taylor
      </ExternalLink>
    </span>
  </footer>
);

export default memo(SiteFooter);
