import { renderHook } from "@testing-library/react";
import { useContentfulLivePreview } from "./use-contentful-live-updates";
import * as ContentfulLivePreview from "@contentful/live-preview/react";
import * as LivePreviewContext from "../contexts/ContentfulLivePreviewProvider";

jest.mock("@contentful/live-preview/react", () => ({
  useContentfulLiveUpdates: jest.fn(),
}));

jest.mock("../contexts/ContentfulLivePreviewProvider", () => ({
  useLivePreview: jest.fn(),
}));

describe("useContentfulLivePreview", () => {
  const mockData = {
    contentfulNews: {
      id: "123",
      title: "Test News",
      content: "Test content",
    },
  };

  const mockUpdatedData = {
    contentfulNews: {
      id: "123",
      title: "Updated News",
      content: "Updated content",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when preview mode is disabled", () => {
    beforeEach(() => {
      LivePreviewContext.useLivePreview.mockReturnValue({
        isPreviewMode: false,
      });
      ContentfulLivePreview.useContentfulLiveUpdates.mockReturnValue(
        mockUpdatedData,
      );
    });

    it("should return original data without applying live updates", () => {
      const { result } = renderHook(() => useContentfulLivePreview(mockData));

      expect(result.current).toBe(mockData);
      expect(result.current).not.toBe(mockUpdatedData);
    });

    it("should call useContentfulLiveUpdates but ignore the result", () => {
      renderHook(() => useContentfulLivePreview(mockData));

      expect(ContentfulLivePreview.useContentfulLiveUpdates).toHaveBeenCalledWith(
        mockData,
      );
    });

    it("should handle null data", () => {
      const { result } = renderHook(() => useContentfulLivePreview(null));

      expect(result.current).toBe(null);
    });

    it("should handle undefined data", () => {
      const { result } = renderHook(() => useContentfulLivePreview(undefined));

      expect(result.current).toBe(undefined);
    });
  });

  describe("when preview mode is enabled", () => {
    beforeEach(() => {
      LivePreviewContext.useLivePreview.mockReturnValue({
        isPreviewMode: true,
      });
      ContentfulLivePreview.useContentfulLiveUpdates.mockReturnValue(
        mockUpdatedData,
      );
    });

    it("should return updated data from live updates", () => {
      const { result } = renderHook(() => useContentfulLivePreview(mockData));

      expect(result.current).toBe(mockUpdatedData);
      expect(result.current).not.toBe(mockData);
    });

    it("should call useContentfulLiveUpdates with the data", () => {
      renderHook(() => useContentfulLivePreview(mockData));

      expect(ContentfulLivePreview.useContentfulLiveUpdates).toHaveBeenCalledWith(
        mockData,
      );
      expect(
        ContentfulLivePreview.useContentfulLiveUpdates,
      ).toHaveBeenCalledTimes(1);
    });

    it("should handle null data in preview mode", () => {
      ContentfulLivePreview.useContentfulLiveUpdates.mockReturnValue(null);

      const { result } = renderHook(() => useContentfulLivePreview(null));

      expect(result.current).toBe(null);
    });

    it("should handle complex nested data structures", () => {
      const complexData = {
        contentfulWorkDay: {
          id: "456",
          title: "Work Day",
          workDayInformation: {
            raw: "{}",
            references: [
              {
                contentful_id: "asset1",
                title: "Image",
              },
            ],
          },
        },
        previous: { slug: "prev", title: "Previous" },
        next: { slug: "next", title: "Next" },
      };

      const updatedComplexData = {
        ...complexData,
        contentfulWorkDay: {
          ...complexData.contentfulWorkDay,
          title: "Updated Work Day",
        },
      };

      ContentfulLivePreview.useContentfulLiveUpdates.mockReturnValue(
        updatedComplexData,
      );

      const { result } = renderHook(() =>
        useContentfulLivePreview(complexData),
      );

      expect(result.current).toBe(updatedComplexData);
      expect(result.current.contentfulWorkDay.title).toBe("Updated Work Day");
    });
  });

  describe("when switching between preview modes", () => {
    it("should update behavior when preview mode changes", () => {
      const { rerender } = renderHook(() => useContentfulLivePreview(mockData));

      LivePreviewContext.useLivePreview.mockReturnValue({
        isPreviewMode: false,
      });
      ContentfulLivePreview.useContentfulLiveUpdates.mockReturnValue(
        mockUpdatedData,
      );

      rerender();
      const { result: result1 } = renderHook(() =>
        useContentfulLivePreview(mockData),
      );
      expect(result1.current).toBe(mockData);

      LivePreviewContext.useLivePreview.mockReturnValue({
        isPreviewMode: true,
      });

      rerender();
      const { result: result2 } = renderHook(() =>
        useContentfulLivePreview(mockData),
      );
      expect(result2.current).toBe(mockUpdatedData);
    });
  });
});
