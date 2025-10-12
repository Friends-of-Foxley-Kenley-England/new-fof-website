import React from "react";
import { render } from "@testing-library/react";
import Bio from "./bio";

describe("Bio", () => {
  beforeEach(() => {
    const useStaticQuery = jest.spyOn(require("gatsby"), "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          description:
            "The Friends of Foxley are a group of volunteers who manage Foxley Wood in Kenley, Surrey.",
        },
      },
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the bio description", () => {
    const { getByText } = render(<Bio />);

    const bioDescription = getByText(
      "The Friends of Foxley are a group of volunteers who manage Foxley Wood in Kenley, Surrey.",
    );

    expect(bioDescription).toBeInTheDocument();
  });

  it("renders the bio container", () => {
    const { container } = render(<Bio />);
    expect(container.querySelector(".bio")).toBeInTheDocument();
  });

  it("handles missing description gracefully", () => {
    const useStaticQuery = jest.spyOn(require("gatsby"), "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          description: null,
        },
      },
    }));

    const { container } = render(<Bio />);

    expect(container.querySelector(".bio")).toBeInTheDocument();
    expect(container.querySelector(".bio p")).not.toBeInTheDocument();
  });
});
