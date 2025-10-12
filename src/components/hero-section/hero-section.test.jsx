import React from "react";
import { render } from "@testing-library/react";
import HeroSection from "./hero-section";

describe("HeroSection", () => {
  it("renders the hero section", () => {
    const { container } = render(<HeroSection />);

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders the heading", () => {
    const { getByRole } = render(<HeroSection />);

    const heading = getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Friends of Foxley");
  });
});
