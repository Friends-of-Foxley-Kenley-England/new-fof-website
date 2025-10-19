import React from "react";
import { render, screen } from "@testing-library/react";
import {
  ContentfulLivePreviewProvider,
  useLivePreview,
} from "./ContentfulLivePreviewProvider";

jest.mock("@contentful/live-preview/react", () => ({
  ContentfulLivePreviewProvider: ({ children }) => (
    <div data-testid="contentful-provider">{children}</div>
  ),
}));

jest.mock("@contentful/live-preview/style.css", () => ({}));

const TestConsumer = () => {
  const { isPreviewMode } = useLivePreview();
  return <div data-testid="preview-mode">{String(isPreviewMode)}</div>;
};

const renderWithProvider = (children) => {
  return render(
    <ContentfulLivePreviewProvider>
      {children}
    </ContentfulLivePreviewProvider>,
  );
};

describe("ContentfulLivePreviewProvider", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("when GATSBY_CONTENTFUL_PREVIEW_MODE is not set", () => {
    beforeEach(() => {
      delete process.env.GATSBY_CONTENTFUL_PREVIEW_MODE;
    });

    it("should render children without Contentful provider", () => {
      renderWithProvider(<TestConsumer />);

      const provider = screen.queryByTestId("contentful-provider");
      const previewMode = screen.getByTestId("preview-mode");

      expect(provider).not.toBeInTheDocument();
      expect(previewMode).toHaveTextContent("false");
    });

    it("should provide isPreviewMode as false in context", () => {
      renderWithProvider(<TestConsumer />);

      const previewMode = screen.getByTestId("preview-mode");

      expect(previewMode).toHaveTextContent("false");
    });
  });

  describe("when GATSBY_CONTENTFUL_PREVIEW_MODE is false", () => {
    beforeEach(() => {
      process.env.GATSBY_CONTENTFUL_PREVIEW_MODE = "false";
    });

    it("should render children without Contentful provider", () => {
      renderWithProvider(<TestConsumer />);

      const provider = screen.queryByTestId("contentful-provider");
      const previewMode = screen.getByTestId("preview-mode");

      expect(provider).not.toBeInTheDocument();
      expect(previewMode).toHaveTextContent("false");
    });
  });

  describe("when GATSBY_CONTENTFUL_PREVIEW_MODE is true", () => {
    beforeEach(() => {
      process.env.GATSBY_CONTENTFUL_PREVIEW_MODE = "true";
    });

    it("should render children with Contentful provider", () => {
      renderWithProvider(<TestConsumer />);

      const provider = screen.getByTestId("contentful-provider");
      const previewMode = screen.getByTestId("preview-mode");

      expect(provider).toBeInTheDocument();
      expect(previewMode).toHaveTextContent("true");
    });

    it("should provide isPreviewMode as true in context", () => {
      renderWithProvider(<TestConsumer />);

      const previewMode = screen.getByTestId("preview-mode");

      expect(previewMode).toHaveTextContent("true");
    });

    it("should render multiple children correctly", () => {
      renderWithProvider(
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </>,
      );

      const child1 = screen.getByTestId("child-1");
      const child2 = screen.getByTestId("child-2");
      const provider = screen.getByTestId("contentful-provider");

      expect(child1).toBeInTheDocument();
      expect(child2).toBeInTheDocument();
      expect(provider).toBeInTheDocument();
    });
  });

  describe("useLivePreview hook", () => {
    it("should return context value when inside provider", () => {
      process.env.GATSBY_CONTENTFUL_PREVIEW_MODE = "true";

      renderWithProvider(<TestConsumer />);

      const previewMode = screen.getByTestId("preview-mode");

      expect(previewMode).toHaveTextContent("true");
    });

    it("should return default value when used outside provider", () => {
      render(<TestConsumer />);

      const previewMode = screen.getByTestId("preview-mode");

      expect(previewMode).toHaveTextContent("false");
    });
  });
});
