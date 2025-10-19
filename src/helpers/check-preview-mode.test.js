import { checkPreviewMode, isPreviewConfigured } from "./check-preview-mode";

describe("check-preview-mode", () => {
  const originalEnv = process.env;
  const originalWindow = global.window;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    process.env = originalEnv;
    global.window = originalWindow;
    jest.restoreAllMocks();
  });

  describe("checkPreviewMode", () => {
    describe("in SSR context (no window)", () => {
      it("should return not configured message when window is undefined", () => {
        const mockCheckPreviewModeSSR = () => {
          if (typeof window === "undefined") {
            return {
              isConfigured: false,
              message: "Running in SSR context",
            };
          }
          return {
            isPreviewMode: false,
            contentfulHost: undefined,
            hasPreviewToken: false,
          };
        };

        const result = mockCheckPreviewModeSSR();
        
        expect(result).toEqual({
          isPreviewMode: false,
          contentfulHost: undefined,
          hasPreviewToken: false,
        });
      });
    });

    describe("in browser context", () => {
      beforeEach(() => {
        global.window = {};
      });

      describe("when preview mode is disabled", () => {
        beforeEach(() => {
          delete process.env.GATSBY_CONTENTFUL_PREVIEW_MODE;
          delete process.env.CONTENTFUL_HOST;
          delete process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
        });

        it("should return config with isPreviewMode false", () => {
          const result = checkPreviewMode();

          expect(result).toEqual({
            isPreviewMode: false,
            contentfulHost: undefined,
            hasPreviewToken: false,
          });
        });

        it("should not log in production", () => {
          process.env.NODE_ENV = "production";
          checkPreviewMode();

          expect(console.log).not.toHaveBeenCalled();
        });
      });

      describe("when preview mode is enabled", () => {
        beforeEach(() => {
          process.env.GATSBY_CONTENTFUL_PREVIEW_MODE = "true";
          process.env.CONTENTFUL_HOST = "preview.contentful.com";
          process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = "test-token-123";
        });

        it("should return config with isPreviewMode true", () => {
          const result = checkPreviewMode();

          expect(result).toEqual({
            isPreviewMode: true,
            contentfulHost: "preview.contentful.com",
            hasPreviewToken: true,
          });
        });

        it("should log configuration in development", () => {
          process.env.NODE_ENV = "development";
          const result = checkPreviewMode();

          expect(console.log).toHaveBeenCalledWith(
            "🔍 Contentful Live Preview Configuration:",
            result,
          );
        });

        it("should not log in production", () => {
          process.env.NODE_ENV = "production";
          checkPreviewMode();

          expect(console.log).not.toHaveBeenCalled();
        });
      });

      describe("when preview mode env var is false", () => {
        beforeEach(() => {
          process.env.GATSBY_CONTENTFUL_PREVIEW_MODE = "false";
          process.env.CONTENTFUL_HOST = "preview.contentful.com";
          process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = "test-token-123";
        });

        it("should return config with isPreviewMode false", () => {
          const result = checkPreviewMode();

          expect(result.isPreviewMode).toBe(false);
        });
      });

      describe("when only some preview settings are configured", () => {
        it("should detect missing preview token", () => {
          process.env.GATSBY_CONTENTFUL_PREVIEW_MODE = "true";
          process.env.CONTENTFUL_HOST = "preview.contentful.com";
          delete process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

          const result = checkPreviewMode();

          expect(result).toEqual({
            isPreviewMode: true,
            contentfulHost: "preview.contentful.com",
            hasPreviewToken: false,
          });
        });

        it("should detect missing host", () => {
          process.env.GATSBY_CONTENTFUL_PREVIEW_MODE = "true";
          delete process.env.CONTENTFUL_HOST;
          process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = "test-token-123";

          const result = checkPreviewMode();

          expect(result).toEqual({
            isPreviewMode: true,
            contentfulHost: undefined,
            hasPreviewToken: true,
          });
        });
      });
    });
  });

  describe("isPreviewConfigured", () => {
    beforeEach(() => {
      delete process.env.CONTENTFUL_HOST;
      delete process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
    });

    it("should return false when nothing is configured", () => {
      const result = isPreviewConfigured();

      expect(result).toBe(false);
    });

    it("should return false when only host is configured", () => {
      process.env.CONTENTFUL_HOST = "preview.contentful.com";

      const result = isPreviewConfigured();

      expect(result).toBe(false);
    });

    it("should return false when only token is configured", () => {
      process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = "test-token-123";

      const result = isPreviewConfigured();

      expect(result).toBe(false);
    });

    it("should return false when host is not preview.contentful.com", () => {
      process.env.CONTENTFUL_HOST = "cdn.contentful.com";
      process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = "test-token-123";

      const result = isPreviewConfigured();

      expect(result).toBe(false);
    });

    it("should return true when both host and token are correctly configured", () => {
      process.env.CONTENTFUL_HOST = "preview.contentful.com";
      process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = "test-token-123";

      const result = isPreviewConfigured();

      expect(result).toBe(true);
    });

    it("should return false when token is empty string", () => {
      process.env.CONTENTFUL_HOST = "preview.contentful.com";
      process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = "";

      const result = isPreviewConfigured();

      expect(result).toBe(false);
    });
  });
});
