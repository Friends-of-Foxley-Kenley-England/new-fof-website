import { createContext, useContext } from "react";
import { ContentfulLivePreviewProvider as ContentfulProvider } from "@contentful/live-preview/react";
import "@contentful/live-preview/style.css";

const LivePreviewContext = createContext({
  isPreviewMode: false,
});

export const useLivePreview = () => useContext(LivePreviewContext);

export const ContentfulLivePreviewProvider = ({ children }) => {
  // Check if we're in preview mode based on environment variable
  const isPreviewMode = process.env.GATSBY_CONTENTFUL_PREVIEW_MODE === "true";

  // Only enable live preview if we're in preview mode
  if (!isPreviewMode) {
    return (
      <LivePreviewContext.Provider value={{ isPreviewMode: false }}>
        {children}
      </LivePreviewContext.Provider>
    );
  }

  return (
    <ContentfulProvider
      locale="en-US"
      enableInspectorMode={true}
      enableLiveUpdates={true}
    >
      <LivePreviewContext.Provider value={{ isPreviewMode: true }}>
        {children}
      </LivePreviewContext.Provider>
    </ContentfulProvider>
  );
};
