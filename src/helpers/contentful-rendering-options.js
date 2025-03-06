import { GatsbyImage } from "gatsby-plugin-image";

export const contentfulRenderingOptions = (className = null) => {
  return {
    renderNode: {
      "embedded-asset-block": node => {
        const { gatsbyImageData, title } = node.data.target;

        if (!gatsbyImageData) {
          // asset is not an image
          return null;
        }

        return (
          <GatsbyImage
            image={gatsbyImageData}
            alt={title}
            className={className}
          />
        );
      },
    },
  };
};
