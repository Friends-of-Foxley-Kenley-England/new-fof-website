import React from 'react';

// Mock gatsby functions
const gatsby = {};

// Mock useStaticQuery
export const useStaticQuery = () => ({
  site: {
    siteMetadata: {
      title: 'Friends of Foxley',
      description: 'Protecting and enhancing Foxley Woods for wildlife and the local community.',
      menuLinks: [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Events', link: '/events' },
        { name: 'Contact', link: '/contact' },
      ],
      social: {
        facebook: 'https://www.facebook.com/FriendsOfFoxley',
      },
    },
  },
});

// Mock graphql
export const graphql = () => null;

// Mock Link component
export const Link = ({ to, children, getProps, ...props }) => {
  // Mock getProps function for active link detection
  const mockProps = getProps ? getProps({ isCurrent: to === '/' }) : {};
  return (
    <a href={to} {...props} {...mockProps}>
      {children}
    </a>
  );
};

// Mock StaticImage component
export const StaticImage = ({ src, alt, ...props }) => {
  // Convert Gatsby image path to static path served by Storybook
  const staticSrc = src.replace(/^.*images/, '');
  
  return (
    <img src={staticSrc} alt={alt} {...props} />
  );
};

// Mock navigate function
export const navigate = (to) => {
  console.log(`Navigate to: ${to}`);
};

// Mock useSiteMetadata hook
export const useSiteMetadata = () => ({
  description: 'Protecting and enhancing Foxley Woods for wildlife and the local community.',
  locale: 'en',
  organisationName: 'Friends of Foxley',
  siteUrl: 'https://www.friendsoffoxley.co.uk',
  title: 'Friends of Foxley',
  social: {
    facebook: 'https://www.facebook.com/FriendsOfFoxley',
  },
});

export default gatsby;