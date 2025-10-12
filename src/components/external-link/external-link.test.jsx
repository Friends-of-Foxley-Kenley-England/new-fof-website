import React from "react";
import { render } from "@testing-library/react";
import ExternalLink from "./external-link";

describe("ExternalLink", () => {
  it("renders a link with the correct href", () => {
    const { getByRole } = render(
      <ExternalLink href="https://example.com">Click here</ExternalLink>,
    );

    const link = getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders children content", () => {
    const { getByText } = render(
      <ExternalLink href="https://example.com">Click here</ExternalLink>,
    );

    const childContent = getByText("Click here");
    expect(childContent).toBeInTheDocument();
  });

  it("opens in a new tab", () => {
    const { getByRole } = render(
      <ExternalLink href="https://example.com">Click here</ExternalLink>,
    );

    const link = getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("has security attributes rel='noopener noreferrer'", () => {
    const { getByRole } = render(
      <ExternalLink href="https://example.com">Click here</ExternalLink>,
    );

    const link = getByRole("link");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("sets aria-label with '(opens in new tab)' suffix when provided", () => {
    const { getByRole } = render(
      <ExternalLink href="https://example.com" aria-label="Visit our website">
        Click here
      </ExternalLink>,
    );

    const link = getByRole("link");
    expect(link).toHaveAttribute(
      "aria-label",
      "Visit our website (opens in new tab)",
    );
  });

  it("sets title with '(opens in new tab)' suffix when aria-label is provided", () => {
    const { getByRole } = render(
      <ExternalLink href="https://example.com" aria-label="Visit our website">
        Click here
      </ExternalLink>,
    );

    const link = getByRole("link");
    expect(link).toHaveAttribute(
      "title",
      "Visit our website (opens in new tab)",
    );
  });

  it("sets default title when aria-label is not provided", () => {
    const { getByRole } = render(
      <ExternalLink href="https://example.com">Click here</ExternalLink>,
    );

    const link = getByRole("link");
    expect(link).toHaveAttribute("title", "Opens in new tab");
  });

  it("does not set aria-label when not provided", () => {
    const { getByRole } = render(
      <ExternalLink href="https://example.com">Click here</ExternalLink>,
    );

    const link = getByRole("link");
    expect(link).not.toHaveAttribute("aria-label");
  });
});
