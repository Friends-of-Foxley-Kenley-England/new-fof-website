import FindUsOnFacebook from "./find-us-on-facebook";
import "../../style.variables.css";

export default {
  title: "Components/FindUsOnFacebook",
  component: FindUsOnFacebook,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    useWhiteGraphic: {
      control: "boolean",
      description: "Use white version of Facebook logo",
    },
  },
};

export const Default = {
  args: {
    useWhiteGraphic: false,
  },
};

export const WhiteGraphic = {
  args: {
    useWhiteGraphic: true,
  },
  render: args => (
    <div
      style={{ backgroundColor: "var(--color-dark-green)", padding: "3rem" }}
    >
      <p style={{ color: "white", fontSize: "1.2rem" }}>
        Note: the graphic is white, but the background colour can be whatever
        you like{" "}
      </p>

      <FindUsOnFacebook {...args} />
    </div>
  ),
};
