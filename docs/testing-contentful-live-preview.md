# Testing Contentful Live Preview

This document describes the test coverage for Contentful Live Preview functionality.

## Test Files

### Unit Tests

1. **`src/contexts/ContentfulLivePreviewProvider.test.jsx`**
   - Tests the context provider that wraps the app
   - Verifies environment variable-based activation
   - Tests context value propagation
   - Validates behavior in preview and non-preview modes

2. **`src/hooks/use-contentful-live-updates.test.js`**
   - Tests the custom hook for live updates
   - Verifies data passthrough in non-preview mode
   - Validates live update application in preview mode
   - Tests with various data structures

3. **`src/helpers/check-preview-mode.test.js`**
   - Tests preview mode detection utility
   - Validates SSR context handling
   - Tests environment variable checking
   - Verifies configuration validation

### Integration Tests

4. **`src/templates/blog-post.test.jsx`**
   - Tests blog post template with live preview
   - Verifies hook integration
   - Tests live data updates
   - Validates navigation and edge cases

5. **`src/templates/work-day-information.test.jsx`**
   - Tests work day template with live preview
   - Verifies hook integration
   - Tests live data updates
   - Validates location parsing and edge cases

## Mocks

### `__mocks__/@contentful/live-preview/react.js`
Mock implementation of the Contentful Live Preview SDK to avoid importing the actual library in tests.

### `__mocks__/@contentful/live-preview/style.css`
Mock for CSS imports to prevent test failures.

## Running Tests

### Run all tests
```bash
yarn test
```

### Run tests in watch mode
```bash
yarn test:watch
```

### Run tests with coverage
```bash
yarn test:coverage
```

### Run specific test file
```bash
yarn test ContentfulLivePreviewProvider.test
```

## Test Coverage

The test suite covers:

- ✅ **Environment-based activation** - Preview mode only activates with correct env var
- ✅ **Context propagation** - Context values are correctly passed to consumers
- ✅ **Hook behavior** - Custom hook correctly applies or bypasses live updates
- ✅ **Template integration** - Templates correctly use the live preview hook
- ✅ **Data updates** - Live updates are applied when in preview mode
- ✅ **Edge cases** - Null/undefined data, missing fields, SSR context
- ✅ **Configuration validation** - Proper detection of preview configuration

## Writing New Tests

When adding new components that use Contentful Live Preview:

1. **Mock the hook**:
   ```javascript
   jest.mock("../hooks/use-contentful-live-updates", () => ({
     useContentfulLivePreview: jest.fn((data) => data),
   }));
   ```

2. **Test with original data**:
   ```javascript
   it("should call useContentfulLivePreview with data", () => {
     render(<YourComponent data={mockData} />);
     
     expect(useContentfulLivePreview).toHaveBeenCalledWith(mockData);
   });
   ```

3. **Test with updated data**:
   ```javascript
   it("should use updated data from live preview", () => {
     const updatedData = { ...mockData, title: "Updated" };
     useContentfulLivePreview.mockReturnValue(updatedData);
     
     render(<YourComponent data={mockData} />);
     
     expect(screen.getByText("Updated")).toBeInTheDocument();
   });
   ```

## Continuous Integration

Tests run automatically on:
- Every pull request
- Every push to main branch
- Before deployment

See `.github/workflows/ci.yml` for CI configuration.

## Debugging Tests

### Enable verbose output
```bash
yarn test --verbose
```

### Run tests with Node debugger
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Check specific test output
```bash
yarn test --testNamePattern="should render with preview mode"
```

## Best Practices

1. **Always mock external dependencies** - Use mocks for Contentful SDK, Gatsby, etc.
2. **Test both modes** - Verify behavior with preview enabled and disabled
3. **Test edge cases** - Null data, missing fields, SSR context
4. **Keep tests focused** - One assertion per test when possible
5. **Use descriptive test names** - Clearly state what is being tested
6. **Clean up after tests** - Restore mocks and environment variables

## Common Issues

### Issue: Tests fail with "Cannot find module @contentful/live-preview"
**Solution**: Ensure mocks are in place in `__mocks__/@contentful/live-preview/`

### Issue: Environment variables not working in tests
**Solution**: Set `process.env` in `beforeEach` and restore in `afterEach`

### Issue: Window is not defined
**Solution**: Check for SSR context with `typeof window === "undefined"`

### Issue: React hooks error
**Solution**: Use `renderHook` from `@testing-library/react` for testing hooks
