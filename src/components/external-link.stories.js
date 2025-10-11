import ExternalLink from './external-link.jsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/ExternalLink',
  component: ExternalLink,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    href: {
      control: 'text',
      description: 'The URL to link to',
    },
    children: {
      control: 'text',
      description: 'The text content of the link',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    href: 'https://www.friendsoffoxley.co.uk',
    children: 'Visit Friends of Foxley Website',
  },
};

export const WithAriaLabel = {
  args: {
    href: 'https://www.facebook.com/pages/Friends-Of-Foxley/153091734719899',
    children: 'Facebook Page',
    'aria-label': 'Visit our Facebook page',
  },
};

export const LongText = {
  args: {
    href: 'https://www.gov.uk/government/organisations/natural-england',
    children: 'Natural England - Government Department for Environmental Conservation and Wildlife Protection',
  },
};

export const WithCustomAttributes = {
  args: {
    href: 'https://www.rspb.org.uk',
    children: 'RSPB Wildlife Conservation',
    className: 'custom-link-class',
    style: { color: '#2563eb', textDecoration: 'underline' },
  },
};

export const EmailLink = {
  args: {
    href: 'mailto:info@friendsoffoxley.co.uk',
    children: 'Contact Us',
    'aria-label': 'Send an email to Friends of Foxley',
  },
};