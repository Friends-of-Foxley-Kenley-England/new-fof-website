import { render, screen } from "@testing-library/react";
import What3wordsAddress from "./what3words-address";

describe("What3wordsAddress", () => {
  it.each(["loves.final.needed", "tune.then.global", "drives.slime.gates"])(
    "displays ///%s and links to its map",
    words => {
      render(<What3wordsAddress words={words} />);

      const link = screen.getByRole("link");
      expect(link).toHaveTextContent(`///${words}`);
      expect(link).toHaveAttribute(
        "href",
        `https://map.what3words.com/${words}`,
      );
    },
  );

  it("includes the location description and new-tab warning in its accessible name", () => {
    render(
      <What3wordsAddress
        words="loves.final.needed"
        description="At the entrance in Woodland Way"
      />,
    );

    const link = screen.getByRole("link", {
      name: "View ///loves.final.needed on what3words: At the entrance in Woodland Way (opens in new tab)",
    });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("provides an accessible name without a location description", () => {
    render(<What3wordsAddress words="loves.final.needed" />);

    expect(
      screen.getByRole("link", {
        name: "View ///loves.final.needed on what3words (opens in new tab)",
      }),
    ).toBeInTheDocument();
  });
});
