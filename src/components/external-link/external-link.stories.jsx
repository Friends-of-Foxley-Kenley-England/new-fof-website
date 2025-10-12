import ExternalLink from "./external-link";

export default {
  title: "Components/ExternalLink",
  component: ExternalLink,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "URL to link to",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for the link",
    },
    children: {
      control: "text",
      description: "Link content",
    },
  },
};

export const Default = {
  args: {
    href: "https://example.com",
    children: "Visit Example",
  },
};
