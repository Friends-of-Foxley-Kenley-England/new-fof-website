import React from "react";
import { render } from "@testing-library/react";
import FindUsOnFacebook from "./find-us-on-facebook";

describe("FindUsOnFacebook", () => {
  beforeEach(() => {
    const useStaticQuery = jest.spyOn(require("gatsby"), "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          social: {
            facebook: "https://www.facebook.com/friendsoffoxley",
          },
        },
      },
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders a link to Facebook", () => {
    const { getByRole } = render(<FindUsOnFacebook />);

    const link = getByRole("link");

    expect(link).toHaveAttribute(
      "href",
      "https://www.facebook.com/friendsoffoxley",
    );
  });

  it("has correct aria-label", () => {
    const { getByRole } = render(<FindUsOnFacebook />);

    const link = getByRole("link");

    expect(link).toHaveAttribute(
      "aria-label",
      "Visit our Facebook page (opens in new tab)",
    );
  });

  it("renders without errors", () => {
    const { getByRole } = render(<FindUsOnFacebook />);

    const link = getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("renders with white graphic when useWhiteGraphic prop is true", () => {
    const { getByRole } = render(<FindUsOnFacebook useWhiteGraphic />);

    const link = getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://www.facebook.com/friendsoffoxley",
    );
  });
});
