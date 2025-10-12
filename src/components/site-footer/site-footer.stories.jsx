import SiteFooter from "./site-footer";

export default {
  title: "Components/SiteFooter",
  component: SiteFooter,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {},
  render: args => (
    <div
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        marginTop: "0px",
        backgroundColor: "var(--color-white)",
      }}
    >
      <div style={{ flex: 1, padding: "var(--spacing-5)" }}>
        <h1>Heading</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          tempore quos, nesciunt a odio quia distinctio, omnis magni molestiae
          et veniam molestias! Libero consequuntur nesciunt excepturi minus
          autem, hic ab.
        </p>
      </div>
      <SiteFooter {...args} />
    </div>
  ),
};
