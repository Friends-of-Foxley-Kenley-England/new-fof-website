import Seo from './seo';

export default {
  title: 'Components/SEO',
  component: Seo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'SEO component that renders meta tags for the page. Meta tags are not visible in the rendered output but can be inspected in the document head.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Page title',
    },
    description: {
      control: 'text',
      description: 'Page description for meta tags',
    },
    pathname: {
      control: 'text',
      description: 'Page pathname for canonical URL',
    },
    noIndex: {
      control: 'boolean',
      description: 'Add noindex meta tag',
    },
  },
};

export const Default = {
  args: {},
  render: (args) => (
    <div>
      <Seo {...args} />
      <p>SEO component renders meta tags in the document head. Check the browser dev tools to see the meta tags.</p>
    </div>
  ),
};