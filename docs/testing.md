# Testing Guide

This project uses Jest and React Testing Library to test Gatsby React components.

## Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode (re-runs on file changes)
yarn test:watch

# Run tests with coverage report
yarn test:coverage
```

## Test Structure

Tests are located in `__tests__` directories alongside the components they test:

```
src/
  components/
    bio/
      bio.jsx
      __tests__/
        bio.test.jsx
```

## Writing Tests

### Basic Component Test

```jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
});
```

### Testing Components with Gatsby's useStaticQuery

For components that use Gatsby's `useStaticQuery`, you need to mock the query:

```jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Bio from "../bio";

describe("Bio", () => {
  beforeEach(() => {
    const useStaticQuery = jest.spyOn(require("gatsby"), "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          description: "Test description",
        },
      },
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the bio description", () => {
    render(<Bio />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Button", () => {
  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByText("Click me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Configuration Files

- **`jest.config.js`** - Main Jest configuration
- **`jest-preprocess.js`** - Babel transformer for Jest
- **`jest.setup.js`** - Setup file that runs before tests (imports jest-dom matchers)
- **`__mocks__/gatsby.js`** - Mocks Gatsby modules (Link, graphql, useStaticQuery)
- **`__mocks__/file-mock.js`** - Mocks static file imports

## Available Matchers

Thanks to `@testing-library/jest-dom`, you have access to custom matchers:

- `toBeInTheDocument()`
- `toHaveTextContent(text)`
- `toHaveAttribute(attr, value)`
- `toHaveClass(className)`
- `toBeVisible()`
- `toBeDisabled()`
- And many more...

See the [jest-dom documentation](https://github.com/testing-library/jest-dom) for a complete list.

## Best Practices

1. **Test user behavior, not implementation details** - Focus on what the user sees and does
2. **Use semantic queries** - Prefer `getByRole`, `getByLabelText`, `getByText` over `getByTestId`
3. **Mock external dependencies** - Mock Gatsby queries, API calls, and external modules
4. **Keep tests isolated** - Each test should be independent and not rely on others
5. **Use descriptive test names** - Test names should clearly describe what is being tested

## Troubleshooting

### "Cannot find module" errors

Make sure all dependencies are installed:

```bash
yarn install
```

### Tests fail with "React is not defined"

This is already configured, but if you see this error, ensure `jest-preprocess.js` has the automatic JSX runtime configured.

### Gatsby-specific issues

The `__mocks__/gatsby.js` file provides mocks for common Gatsby modules. If you need to mock additional Gatsby functionality, add it to this file.
