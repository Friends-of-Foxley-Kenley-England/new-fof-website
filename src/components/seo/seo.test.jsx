import React from "react";
import { render } from "@testing-library/react";
import Seo from "./seo";

jest.mock("../../hooks/use-site-metadata", () => ({
  useSiteMetadata: () => ({
    description: "Default site description",
    locale: "en_GB",
    organisationName: "Friends of Foxley",
    siteUrl: "https://example.com",
    title: "Friends of Foxley - Default Title",
  }),
}));

describe("Seo", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(message => {
      // Suppress expected DOM nesting warnings for <html> and <head> elements
      // These are valid in Gatsby's Head API context but trigger warnings in test environment
      if (
        typeof message === "string" &&
        message.includes("validateDOMNesting")
      ) {
        return;
      }

      console.warn(message);
    });
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it("renders default title when no title prop provided", () => {
    const { container } = render(<Seo />);
    const title = container.querySelector("title");

    expect(title).toHaveTextContent("Friends of Foxley - Default Title");
  });

  it("renders custom title with organisation name", () => {
    const { container } = render(<Seo title="About Us" />);
    const title = container.querySelector("title");

    expect(title).toHaveTextContent("About Us | Friends of Foxley");
  });

  it("renders default description when no description prop provided", () => {
    const { container } = render(<Seo />);
    const descriptionMeta = container.querySelector('meta[name="description"]');

    expect(descriptionMeta).toHaveAttribute(
      "content",
      "Default site description",
    );
  });

  it("renders custom description when provided", () => {
    const { container } = render(<Seo description="Custom description" />);
    const descriptionMeta = container.querySelector('meta[name="description"]');

    expect(descriptionMeta).toHaveAttribute("content", "Custom description");
  });

  it("renders canonical URL when pathname provided", () => {
    const { container } = render(<Seo pathname="/about" />);
    const canonicalLink = container.querySelector('link[rel="canonical"]');

    expect(canonicalLink).toHaveAttribute("href", "https://example.com/about");
  });

  it("renders robots noindex meta when noIndex is true", () => {
    const { container } = render(<Seo noIndex={true} />);
    const robotsMeta = container.querySelector('meta[name="robots"]');

    expect(robotsMeta).toHaveAttribute("content", "noindex,nofollow");
  });

  it("does not render robots meta when noIndex is false", () => {
    const { container } = render(<Seo noIndex={false} />);
    const robotsMeta = container.querySelector('meta[name="robots"]');

    expect(robotsMeta).not.toBeInTheDocument();
  });

  it("renders Open Graph meta tags", () => {
    const { container } = render(<Seo title="Test Page" />);
    const ogTitle = container.querySelector('meta[property="og:title"]');
    const ogType = container.querySelector('meta[property="og:type"]');
    const ogLocale = container.querySelector('meta[property="og:locale"]');

    expect(ogTitle).toHaveAttribute("content", "Test Page | Friends of Foxley");
    expect(ogType).toHaveAttribute("content", "website");
    expect(ogLocale).toHaveAttribute("content", "en_GB");
  });
});
