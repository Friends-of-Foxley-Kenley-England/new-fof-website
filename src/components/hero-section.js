import { StaticImage } from "gatsby-plugin-image";
import * as style from "./hero-section.module.css";
import React from "react";

const HeroSection = () => {
  return (
    <section className={style.container} data-qa="hero-section">
      <StaticImage
        src="../images/hero-image.png"
        alt="tree canopy in Foxley woods"
        imgClassName={style.imageStyling}
        loading="eager"
        objectFit="cover"
        layout="fullWidth"
        placeholder="dominantColor"
      />
      <h1 className={style.centered}>Friends of Foxley</h1>
    </section>
  );
};

export default HeroSection;
