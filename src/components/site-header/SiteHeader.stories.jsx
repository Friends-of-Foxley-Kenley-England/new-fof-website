import SiteHeader from './site-header';

export default {
  title: 'Components/SiteHeader',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    siteTitle: {
      control: 'text',
      description: 'The site title displayed in the header',
    },
    menuLinks: {
      control: 'object',
      description: 'Array of menu link objects with name and link properties',
    },
  },
};

export const Default = {
  args: {
    siteTitle: 'Friends of Foxley',
    menuLinks: [
      { name: 'Home', link: '/' },
      { name: 'About', link: '/about' },
      { name: 'Events', link: '/events' },
      { name: 'Contact', link: '/contact' },
    ],
  },
};