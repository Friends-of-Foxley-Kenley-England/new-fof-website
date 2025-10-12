import SiteHeader from "./site-header";

export default {
  title: "Components/SiteHeader",
  component: SiteHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    siteTitle: {
      control: "text",
      description: "The site title displayed in the header",
    },
    menuLinks: {
      control: "object",
      description: "Array of menu link objects with name and link properties",
    },
  },
  args: {
    siteTitle: "Friends of Foxley",
    menuLinks: [
      { name: "Home", link: "/" },
      { name: "About", link: "/about" },
      { name: "Events", link: "/events" },
      { name: "Contact", link: "/contact" },
    ],
  },
};

export const Default = {
  globals: {
    viewport: { value: "ipad12p", isRotated: false },
  },
};

/** View the story in canvas (select the story in the left panel).  It doesn't render correctly in docs view */
export const SmallerScreens = {
  globals: {
    // 👇 Override viewport for this story
    viewport: { value: "iphone5", isRotated: false },
  },
  parameters: {
    viewport: {
      defaultViewport: "iphone5",
    },
  },
};
