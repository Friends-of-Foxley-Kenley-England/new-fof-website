import React from "react";
import { render, screen } from "@testing-library/react";
import WorkDayWidget from "./work-day-widget";

describe("WorkDayWidget", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("when contentful returns work days", () => {
    beforeEach(() => {
      const useStaticQuery = jest.spyOn(require("gatsby"), "useStaticQuery");
      useStaticQuery.mockImplementation(() => ({
        allContentfulWorkDay: {
          nodes: [
            { slug: "work-day-1", id: "1", title: "First Work Day" },
            { slug: "work-day-2", id: "2", title: "Second Work Day" },
            { slug: "work-day-3", id: "3", title: "Third Work Day" },
          ],
        },
      }));
    });

    it("renders the heading", () => {
      render(<WorkDayWidget />);

      expect(screen.getByText("Recent work days")).toBeInTheDocument();
    });

    it("renders the next work days", () => {
      render(<WorkDayWidget />);

      expect(screen.getByText("First Work Day")).toBeInTheDocument();
      expect(screen.getByText("Second Work Day")).toBeInTheDocument();
      expect(screen.getByText("Third Work Day")).toBeInTheDocument();
    });

    it("renders the all work days CTA ", () => {
      render(<WorkDayWidget />);

      const seeAllLink = screen.getByText("See all work days →");
      expect(seeAllLink).toBeInTheDocument();
      expect(seeAllLink.closest("a")).toHaveAttribute("href", "/work-days");
    });
  });

  describe("when no work days returned from contentful", () => {
    beforeEach(() => {
      const useStaticQuery = jest.spyOn(require("gatsby"), "useStaticQuery");
      useStaticQuery.mockImplementation(() => ({
        allContentfulWorkDay: {
          nodes: [],
        },
      }));
    });

    it("renders the heading", () => {
      render(<WorkDayWidget />);

      expect(screen.getByText("Recent work days")).toBeInTheDocument();
    });

    it("renders a message", () => {
      render(<WorkDayWidget />);

      expect(
        screen.getByText("No recent work days scheduled."),
      ).toBeInTheDocument();
    });

    it("renders the all work days CTA ", () => {
      render(<WorkDayWidget />);

      const seeAllLink = screen.getByText("See all work days →");
      expect(seeAllLink).toBeInTheDocument();
      expect(seeAllLink.closest("a")).toHaveAttribute("href", "/work-days");
    });
  });
});
