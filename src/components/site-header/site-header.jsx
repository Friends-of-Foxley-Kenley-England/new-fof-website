import { memo } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import * as style from "./site-header.module.css";

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: style.isOnThisPage } : {};
};

const SiteHeader = ({ siteTitle, menuLinks }) => (
  <header>
    <nav
      id="navbar"
      className={style.navigationBar}
      aria-label="Main navigation">
      <label
        htmlFor="hamburger"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen} // You'd need to track this state
        tabIndex="0" // Make it keyboard focusable
      >
        &#9776;
      </label>
      <input type="checkbox" id="hamburger" aria-controls="navlinks" />

      <div id="navlinks" className={style.navigationLinks}>
        {menuLinks.map(link => (
          <Link getProps={isActive} to={link.link} key={link.name}>
            {link.name}
          </Link>
        ))}
      </div>

      <h3 className={style.title}>{siteTitle}</h3>
    </nav>
  </header>
);

SiteHeader.propTypes = {
  siteTitle: PropTypes.string,
};

SiteHeader.defaultProps = {
  siteTitle: ``,
};

export default memo(SiteHeader);
