/// <reference types="cypress" />
import React from "react";
import HeroSection from "./hero-section";
import "./hero-section.module.css";

describe("HeroSection Component", () => {
  beforeEach(() => {
    cy.mount(<HeroSection />);
  });

  it("renders the hero section with the correct image and text", () => {
    // cy.get("section").should("have.class", "container");

    // cy.get("img").should("have.attr", "src").and("include", "hero-image.png");

    cy.get("h1")
      .should("have.class", "centered")
      .and("contain.text", "Friends of Foxley");
  });
});
