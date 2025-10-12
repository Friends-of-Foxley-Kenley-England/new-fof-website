import React from "react";

// Mock gatsby functions
const gatsby = {};

// Mock useStaticQuery
export const useStaticQuery = () => ({
  site: {
    siteMetadata: {
      title: "Friends of Foxley",
      description:
        "Protecting and enhancing Foxley Woods for wildlife and the local community.",
      menuLinks: [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Events", link: "/events" },
        { name: "Contact", link: "/contact" },
      ],
      social: {
        facebook: "https://www.facebook.com/FriendsOfFoxley",
      },
    },
  },
});

// Mock graphql
export const graphql = () => null;

// Mock Link component
export const Link = ({ to, children, getProps, ...props }) => {
  // Mock getProps function for active link detection
  const mockProps = getProps ? getProps({ isCurrent: to === "/" }) : {};
  return (
    <a href={to} {...props} {...mockProps}>
      {children}
    </a>
  );
};

// Mock StaticImage component
export const StaticImage = ({
  src,
  alt,
  className,
  imgClassName,
  layout = "constrained",
  objectFit = "cover",
  objectPosition = "center",
  loading = "lazy",
  placeholder,
  ...props
}) => {
  // Convert Gatsby image path to static path served by Storybook
  const basePath = process.env.NODE_ENV === "production" ? "/new-fof-website" : "";
  const staticSrc = basePath + src.replace(/^.*images/, "");

  // Mimic Gatsby's wrapper structure
  const wrapperStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
    position: "relative",
    overflow: "hidden",
    ...(layout === "fullWidth" && { width: "100%" }),
    ...(layout === "fixed" && { width: "auto" }),
  };

  const imgStyle = {
    gridArea: "1/1",
    maxWidth: "100%",
    height: "auto",
    objectFit,
    objectPosition,
  };

  return (
    <div
      className={className}
      style={wrapperStyle}
      data-gatsby-image-wrapper=""
    >
      <img
        src={staticSrc}
        alt={alt}
        className={imgClassName}
        loading={loading}
        style={imgStyle}
        {...props}
      />
    </div>
  );
};

// Mock navigate function
export const navigate = to => {
  console.log(`Navigate to: ${to}`);
};

// Mock useSiteMetadata hook
export const useSiteMetadata = () => ({
  description:
    "Protecting and enhancing Foxley Woods for wildlife and the local community.",
  locale: "en",
  organisationName: "Friends of Foxley",
  siteUrl: "https://www.friendsoffoxley.co.uk",
  title: "Friends of Foxley",
  social: {
    facebook: "https://www.facebook.com/FriendsOfFoxley",
  },
});

export default gatsby;
