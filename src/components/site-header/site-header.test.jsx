import React from "react";
import { render } from "@testing-library/react";
import SiteHeader from "./site-header";

describe("SiteHeader", () => {
  const mockMenuLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  it("renders the header element", () => {
    const { container } = render(
      <SiteHeader siteTitle="Test Site" menuLinks={mockMenuLinks} />,
    );
    const header = container.querySelector("header");

    expect(header).toBeInTheDocument();
  });

  it("displays the site title", () => {
    const { getByText } = render(
      <SiteHeader siteTitle="Test Site" menuLinks={mockMenuLinks} />,
    );
    const title = getByText("Test Site");

    expect(title).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    const { getByText } = render(
      <SiteHeader siteTitle="Test Site" menuLinks={mockMenuLinks} />,
    );

    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("About")).toBeInTheDocument();
    expect(getByText("Contact")).toBeInTheDocument();
  });

  it("renders hamburger menu toggle", () => {
    const { container } = render(
      <SiteHeader siteTitle="Test Site" menuLinks={mockMenuLinks} />,
    );
    const hamburger = container.querySelector("#hamburger");

    expect(hamburger).toBeInTheDocument();
    expect(hamburger).toHaveAttribute("type", "checkbox");
  });

  it("renders hamburger label with aria-label", () => {
    const { getByLabelText } = render(
      <SiteHeader siteTitle="Test Site" menuLinks={mockMenuLinks} />,
    );
    const label = getByLabelText("Toggle navigation menu");

    expect(label).toBeInTheDocument();
  });

  it("uses default site title when not provided", () => {
    const { container } = render(<SiteHeader menuLinks={mockMenuLinks} />);
    const title = container.querySelector("h3");

    expect(title).toHaveTextContent("");
  });
});
