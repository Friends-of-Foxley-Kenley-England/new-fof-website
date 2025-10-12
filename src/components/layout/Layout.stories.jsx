import Layout from "./layout";

export default {
  title: "Components/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    location: {
      control: "object",
      description: "Location object with pathname property",
    },
    children: {
      control: "text",
      description: "Page content to render inside the layout",
    },
    showHeroSection: {
      control: "boolean",
      description: "Whether to show the hero section",
    },
  },
  args: {
    location: { pathname: "/" },
    children: (
      <div style={{ padding: "2rem" }}>
        <h1>Page Content</h1>
        <p>This is the main content area of the page.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    ),
    showHeroSection: false,
  },
};

export const Default = {};

export const WithHeroImage = {
  args: {
    showHeroSection: true,
  },
};

/** View the story in canvas (select the story in the left panel).  It doesn't render correctly in docs view */
export const SmallerScreenLayout = {
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

/** View the story in canvas (select the story in the left panel).  It doesn't render correctly in docs view */
export const SmallerScreenLayoutWithHeroImage = {
  args: {
    showHeroSection: true,
  },
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
