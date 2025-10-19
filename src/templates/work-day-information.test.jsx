import React from "react";
import { render, screen } from "@testing-library/react";
import WorkDayTemplate from "./work-day-information";
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

jest.mock("@what3words/react-components", () => ({
  What3wordsAddress: ({ words }) => (
    <div data-testid="what3words">{words}</div>
  ),
}));

jest.mock("gatsby-source-contentful/rich-text", () => ({
  renderRichText: jest.fn((content) => (
    <div data-testid="rich-text">{content?.raw || "Rich text content"}</div>
  )),
}));

jest.mock("../helpers/contentful-rendering-options", () => ({
  contentfulRenderingOptions: jest.fn(() => ({})),
}));

jest.mock("../helpers/parse-meeting-point", () => ({
  parseMeetingPoint: jest.fn((input) => {
    if (!input) return null;
    return {
      meetingPointWhatThreeWords: "tune.then.global",
      meetingPointDescription: "At the entrance in Burwood Avenue",
    };
  }),
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

describe("WorkDayTemplate", () => {
  const mockData = {
    contentfulWorkDay: {
      id: "456",
      contentful_id: "contentful-456",
      sys: {
        contentType: {
          sys: {
            id: "workDay",
          },
        },
      },
      title: "Spring Cleanup 2024",
      dateOfWorkday: "2024-03-15",
      meetingTime: "10:00 AM",
      meetingPointWhat3words: "tune.then.global",
      shortDescriptionOfWorkday: "Spring cleanup work day",
      workDayInformation: {
        raw: '{"nodeType":"document","data":{},"content":[]}',
      },
    },
    previous: {
      slug: "previous-work-day",
      title: "Previous Work Day",
    },
    next: {
      slug: "next-work-day",
      title: "Next Work Day",
    },
  };

  const mockLocation = {
    pathname: "/work-days/spring-cleanup-2024",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    ContentfulLiveUpdates.useContentfulLivePreview.mockImplementation((data) => data);
  });

  describe("rendering", () => {
    it("should render the work day with title", () => {
      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      expect(
        screen.getByText("Work day: Spring Cleanup 2024"),
      ).toBeInTheDocument();
    });

    it("should render meeting time", () => {
      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      expect(screen.getByText("Time")).toBeInTheDocument();
      expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    });

    it("should render location information", () => {
      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      expect(screen.getByText("Location")).toBeInTheDocument();
      expect(
        screen.getByText("At the entrance in Burwood Avenue"),
      ).toBeInTheDocument();
    });

    it("should render what3words component", () => {
      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      expect(screen.getByTestId("what3words")).toBeInTheDocument();
      expect(screen.getByTestId("what3words")).toHaveTextContent(
        "tune.then.global",
      );
    });

    it("should render the bio component", () => {
      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      expect(screen.getByTestId("bio")).toBeInTheDocument();
    });

    it("should render navigation links", () => {
      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      const previousLink = screen.getByText(/Previous Work Day/);
      const nextLink = screen.getByText(/Next Work Day/);

      expect(previousLink).toBeInTheDocument();
      expect(nextLink).toBeInTheDocument();
      expect(previousLink.closest("a")).toHaveAttribute(
        "href",
        "/work-days/previous-work-day",
      );
      expect(nextLink.closest("a")).toHaveAttribute(
        "href",
        "/work-days/next-work-day",
      );
    });

    it("should render work day information", () => {
      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      expect(screen.getByTestId("rich-text")).toBeInTheDocument();
    });
  });

  describe("live preview integration", () => {
    it("should call useContentfulLivePreview with data", () => {
      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      expect(ContentfulLiveUpdates.useContentfulLivePreview).toHaveBeenCalledWith(
        mockData,
      );
    });

    it("should use updated data from live preview", () => {
      const updatedData = {
        ...mockData,
        contentfulWorkDay: {
          ...mockData.contentfulWorkDay,
          title: "Updated Work Day Title",
          meetingTime: "11:00 AM",
        },
      };

      ContentfulLiveUpdates.useContentfulLivePreview.mockReturnValue(
        updatedData,
      );

      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      expect(
        screen.getByText("Work day: Updated Work Day Title"),
      ).toBeInTheDocument();
      expect(screen.getByText("11:00 AM")).toBeInTheDocument();
      expect(screen.queryByText("10:00 AM")).not.toBeInTheDocument();
    });

    it("should handle live preview updates to navigation", () => {
      const updatedData = {
        ...mockData,
        previous: {
          slug: "updated-previous-work-day",
          title: "Updated Previous",
        },
        next: {
          slug: "updated-next-work-day",
          title: "Updated Next",
        },
      };

      ContentfulLiveUpdates.useContentfulLivePreview.mockReturnValue(
        updatedData,
      );

      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      expect(screen.getByText(/Updated Previous/)).toBeInTheDocument();
      expect(screen.getByText(/Updated Next/)).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("should handle missing previous work day", () => {
      const dataWithoutPrevious = {
        ...mockData,
        previous: null,
      };

      render(
        <WorkDayTemplate data={dataWithoutPrevious} location={mockLocation} />,
      );

      expect(screen.queryByText(/Previous Work Day/)).not.toBeInTheDocument();
      expect(screen.getByText(/Next Work Day/)).toBeInTheDocument();
    });

    it("should handle missing next work day", () => {
      const dataWithoutNext = {
        ...mockData,
        next: null,
      };

      render(
        <WorkDayTemplate data={dataWithoutNext} location={mockLocation} />,
      );

      expect(screen.getByText(/Previous Work Day/)).toBeInTheDocument();
      expect(screen.queryByText(/Next Work Day/)).not.toBeInTheDocument();
    });

    it("should handle missing work day information", () => {
      const dataWithoutInfo = {
        ...mockData,
        contentfulWorkDay: {
          ...mockData.contentfulWorkDay,
          workDayInformation: null,
        },
      };

      render(
        <WorkDayTemplate data={dataWithoutInfo} location={mockLocation} />,
      );

      expect(screen.queryByTestId("rich-text")).not.toBeInTheDocument();
    });

    it("should handle missing what3words location", () => {
      const { parseMeetingPoint } = require("../helpers/parse-meeting-point");
      parseMeetingPoint.mockReturnValue({
        meetingPointWhatThreeWords: null,
        meetingPointDescription: "At the entrance",
      });

      render(<WorkDayTemplate data={mockData} location={mockLocation} />);

      expect(screen.queryByTestId("what3words")).not.toBeInTheDocument();
      expect(screen.getByText("At the entrance")).toBeInTheDocument();
    });

    it("should handle null meeting point", () => {
      const { parseMeetingPoint } = require("../helpers/parse-meeting-point");
      parseMeetingPoint.mockReturnValue(null);

      const dataWithNullMeetingPoint = {
        ...mockData,
        contentfulWorkDay: {
          ...mockData.contentfulWorkDay,
          meetingPointWhat3words: null,
        },
      };

      render(
        <WorkDayTemplate
          data={dataWithNullMeetingPoint}
          location={mockLocation}
        />,
      );

      // Should still render without crashing
      expect(screen.getByText("Location")).toBeInTheDocument();
    });
  });
});
