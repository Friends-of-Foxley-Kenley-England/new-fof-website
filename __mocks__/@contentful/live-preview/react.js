/**
 * Mock for @contentful/live-preview/react
 * Used in tests to avoid importing the actual Contentful SDK
 */

import React from "react";

export const ContentfulLivePreviewProvider = ({ children }) => {
  return <div data-testid="contentful-live-preview-provider">{children}</div>;
};

export const useContentfulLiveUpdates = jest.fn(data => data);

export const useContentfulInspectorMode = jest.fn(() => ({
  inspectorMode: null,
}));
