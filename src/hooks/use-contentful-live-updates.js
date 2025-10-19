import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { useLivePreview } from "../contexts/ContentfulLivePreviewProvider";

/**
 * Hook to enable live updates for Contentful data
 * @param {Object} data - The data object from GraphQL query
 * @returns {Object} - The data with live updates applied (or original data if not in preview mode)
 */
export const useContentfulLivePreview = (data) => {
  const { isPreviewMode } = useLivePreview();
  
  // Only apply live updates if we're in preview mode
  const updatedData = useContentfulLiveUpdates(data);
  
  return isPreviewMode ? updatedData : data;
};
