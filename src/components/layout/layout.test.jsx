import React from "react";
import { render } from "@testing-library/react";
import Layout from "./layout";

describe("Layout", () => {
  beforeEach(() => {
    const useStaticQuery = jest.spyOn(require("gatsby"), "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "Friends of Foxley",
          menuLinks: [
            { name: "Home", link: "/" },
            { name: "About", link: "/about" },
          ],
        },
      },
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders children content", () => {
    const { getByText } = render(
      <Layout location={{ pathname: "/" }}>
        <p>Test content</p>
      </Layout>,
    );

    expect(getByText("Test content")).toBeInTheDocument();
  });

  it("renders header and footer", () => {
    const { container } = render(
      <Layout location={{ pathname: "/" }}>
        <p>Test content</p>
      </Layout>,
    );

    expect(container.querySelector("header")).toBeInTheDocument();
    expect(container.querySelector("main")).toBeInTheDocument();
  });

  it("renders hero section when showHeroSection is true", () => {
    const { getByRole } = render(
      <Layout location={{ pathname: "/" }} showHeroSection>
        <p>Test content</p>
      </Layout>,
    );

    const heading = getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Friends of Foxley");
  });

  it("does not render hero section by default", () => {
    const { queryByRole } = render(
      <Layout location={{ pathname: "/" }}>
        <p>Test content</p>
      </Layout>,
    );

    const heading = queryByRole("heading", { level: 1 });
    expect(heading).not.toBeInTheDocument();
  });
});
