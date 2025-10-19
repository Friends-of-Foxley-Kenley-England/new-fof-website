/**
 * Utility to check if Contentful Live Preview is properly configured
 * This can be used for debugging preview mode issues
 */
export const checkPreviewMode = () => {
  if (typeof window === "undefined") {
    return {
      isConfigured: false,
      message: "Running in SSR context",
    };
  }

  const isPreviewMode = process.env.GATSBY_CONTENTFUL_PREVIEW_MODE === "true";

  const config = {
    isPreviewMode,
    contentfulHost: process.env.CONTENTFUL_HOST,
    hasPreviewToken: !!process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  };

  // Log configuration for debugging
  if (process.env.NODE_ENV === "development") {
    console.log("🔍 Contentful Live Preview Configuration:", config);
  }

  return config;
};

/**
 * Check if all required environment variables are set for preview mode
 */
export const isPreviewConfigured = () => {
  return (
    process.env.CONTENTFUL_HOST === "preview.contentful.com" &&
    !!process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
  );
};
