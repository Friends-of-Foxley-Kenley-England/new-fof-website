import React from "react";
import { render, screen } from "@testing-library/react";
import BlogPostTemplate from "./blog-post";
import * as ContentfulLiveUpdates from "../hooks/use-contentful-live-updates";

jest.mock("../components/bio", () => {
  return function Bio() {
    return <div data-testid="bio">Bio Component</div>;
  };
});

jest.mock("../components/layout", () => {
  return function Layout({ children }) {
    return <div data-testid="layout">{children}</div>;
  };
});

jest.mock("../components/seo", () => {
  return function Seo() {
    return null;
  };
});

jest.mock("gatsby-source-contentful/rich-text", () => ({
  renderRichText: jest.fn((content) => (
    <div data-testid="rich-text">{content?.raw || "Rich text content"}</div>
  )),
}));

jest.mock("../helpers/contentful-rendering-options", () => ({
  contentfulRenderingOptions: jest.fn(() => ({})),
}));

jest.mock("../hooks/use-contentful-live-updates", () => ({
  useContentfulLivePreview: jest.fn((data) => data),
}));

jest.mock("gatsby", () => ({
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  graphql: jest.fn(),
}));

describe("BlogPostTemplate", () => {
  const mockData = {
    contentfulNews: {
      id: "123",
      contentful_id: "contentful-123",
      sys: {
        contentType: {
          sys: {
            id: "news",
          },
        },
      },
      title: "Test News Article",
      author: "John Doe",
      createdAt: "1st January 2024",
      newsContent: {
        raw: '{"nodeType":"document","data":{},"content":[]}',
        references: [],
      },
      shortDescription: "A test news article",
    },
    previous: {
      slug: "previous-post",
      title: "Previous Post",
    },
    next: {
      slug: "next-post",
      title: "Next Post",
    },
  };

  const mockLocation = {
    pathname: "/news/test-news-article",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    ContentfulLiveUpdates.useContentfulLivePreview.mockImplementation((data) => data);
  });

  describe("rendering", () => {
    it("should render the blog post with title and author", () => {
      render(<BlogPostTemplate data={mockData} location={mockLocation} />);

      expect(screen.getByText("Test News Article")).toBeInTheDocument();
      expect(screen.getByText(/1st January 2024, by John Doe/)).toBeInTheDocument();
    });

    it("should render the bio component", () => {
      render(<BlogPostTemplate data={mockData} location={mockLocation} />);

      expect(screen.getByTestId("bio")).toBeInTheDocument();
    });

    it("should render navigation links to previous and next posts", () => {
      render(<BlogPostTemplate data={mockData} location={mockLocation} />);

      const previousLink = screen.getByText(/Previous Post/);
      const nextLink = screen.getByText(/Next Post/);

      expect(previousLink).toBeInTheDocument();
      expect(nextLink).toBeInTheDocument();
      expect(previousLink.closest("a")).toHaveAttribute(
        "href",
        "/news/previous-post",
      );
      expect(nextLink.closest("a")).toHaveAttribute("href", "/news/next-post");
    });

    it("should render rich text content", () => {
      render(<BlogPostTemplate data={mockData} location={mockLocation} />);

      expect(screen.getByTestId("rich-text")).toBeInTheDocument();
    });
  });

  describe("live preview integration", () => {
    it("should call useContentfulLivePreview with data", () => {
      render(<BlogPostTemplate data={mockData} location={mockLocation} />);

      expect(ContentfulLiveUpdates.useContentfulLivePreview).toHaveBeenCalledWith(
        mockData,
      );
    });

    it("should use updated data from live preview", () => {
      const updatedData = {
        ...mockData,
        contentfulNews: {
          ...mockData.contentfulNews,
          title: "Updated Title from Live Preview",
        },
      };

      ContentfulLiveUpdates.useContentfulLivePreview.mockReturnValue(
        updatedData,
      );

      render(<BlogPostTemplate data={mockData} location={mockLocation} />);

      expect(
        screen.getByText("Updated Title from Live Preview"),
      ).toBeInTheDocument();
      expect(screen.queryByText("Test News Article")).not.toBeInTheDocument();
    });

    it("should handle live preview updates to navigation", () => {
      const updatedData = {
        ...mockData,
        previous: {
          slug: "updated-previous",
          title: "Updated Previous",
        },
        next: {
          slug: "updated-next",
          title: "Updated Next",
        },
      };

      ContentfulLiveUpdates.useContentfulLivePreview.mockReturnValue(
        updatedData,
      );

      render(<BlogPostTemplate data={mockData} location={mockLocation} />);

      expect(screen.getByText(/Updated Previous/)).toBeInTheDocument();
      expect(screen.getByText(/Updated Next/)).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("should handle missing previous post", () => {
      const dataWithoutPrevious = {
        ...mockData,
        previous: null,
      };

      render(
        <BlogPostTemplate data={dataWithoutPrevious} location={mockLocation} />,
      );

      expect(screen.queryByText(/Previous Post/)).not.toBeInTheDocument();
      expect(screen.getByText(/Next Post/)).toBeInTheDocument();
    });

    it("should handle missing next post", () => {
      const dataWithoutNext = {
        ...mockData,
        next: null,
      };

      render(
        <BlogPostTemplate data={dataWithoutNext} location={mockLocation} />,
      );

      expect(screen.getByText(/Previous Post/)).toBeInTheDocument();
      expect(screen.queryByText(/Next Post/)).not.toBeInTheDocument();
    });

    it("should handle missing news content", () => {
      const dataWithoutContent = {
        ...mockData,
        contentfulNews: {
          ...mockData.contentfulNews,
          newsContent: null,
        },
      };

      render(
        <BlogPostTemplate data={dataWithoutContent} location={mockLocation} />,
      );

      expect(screen.queryByTestId("rich-text")).not.toBeInTheDocument();
    });
  });
});
