import React from "react";
import { render } from "@testing-library/react";
import SiteFooter from "./site-footer";

jest.mock("../find-us-on-facebook", () => {
  return function FindUsOnFacebook() {
    return <div data-testid="find-us-on-facebook">Facebook Link</div>;
  };
});

describe("SiteFooter", () => {
  it("renders the footer element", () => {
    const { container } = render(<SiteFooter />);
    const footer = container.querySelector("footer");
    
    expect(footer).toBeInTheDocument();
  });

  it("renders the FindUsOnFacebook component", () => {
    const { getByTestId } = render(<SiteFooter />);
    const facebookComponent = getByTestId("find-us-on-facebook");

    expect(facebookComponent).toBeInTheDocument();
  });

  it("displays the current year in copyright text", () => {
    const { getByText } = render(<SiteFooter />);
    const currentYear = new Date().getFullYear();
    const text = getByText(new RegExp(`© ${currentYear}`));

    expect(text).toBeInTheDocument();
  });

  it("renders Gatsby link", () => {
    const { getByRole } = render(<SiteFooter />);
    const gatsbyLink = getByRole("link", { name: /Gatsby/i });

    expect(gatsbyLink).toHaveAttribute("href", "https://www.gatsbyjs.com");
  });

  it("renders Eloise Taylor link", () => {
    const { getByRole } = render(<SiteFooter />);
    const eloiseLink = getByRole("link", { name: /Eloise Taylor/i });

    expect(eloiseLink).toHaveAttribute(
      "href",
      "https://github.com/eloisetaylor5693",
    );
  });
});
