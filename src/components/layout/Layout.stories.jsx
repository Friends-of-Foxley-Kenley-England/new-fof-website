import Layout from './layout';

export default {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    location: {
      control: 'object',
      description: 'Location object with pathname property',
    },
    children: {
      control: 'text',
      description: 'Page content to render inside the layout',
    },
    showHeroSection: {
      control: 'boolean',
      description: 'Whether to show the hero section',
    },
  },
};

export const Default = {
  args: {
    location: { pathname: '/' },
    children: (
      <div style={{ padding: '2rem' }}>
        <h1>Page Content</h1>
        <p>This is the main content area of the page.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    ),
    showHeroSection: false,
  },
};