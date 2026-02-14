import WorkDayWidget from "./work-day-widget";

export default {
  title: "Components/WorkDayWidget",
  component: WorkDayWidget,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

const mockUseStaticQuery = mockData => {
  jest.mock("gatsby", () => ({
    ...jest.requireActual("gatsby"),
    useStaticQuery: () => mockData,
  }));
};

export const Default = {
  parameters: {
    mockData: {
      allContentfulWorkDay: {
        nodes: [
          { slug: "work-day-1", id: "1", title: "First Work Day" },
          { slug: "work-day-2", id: "2", title: "Second Work Day" },
          { slug: "work-day-3", id: "3", title: "Third Work Day" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      jest.mock("gatsby", () => ({
        ...jest.requireActual("gatsby"),
        useStaticQuery: () => context.parameters.mockData,
        Link: ({ to, children }) => <a href={to}>{children}</a>,
        graphql: jest.fn(),
      }));
      return <Story />;
    },
  ],
};

export const NoWorkDays = {
  parameters: {
    mockData: {
      allContentfulWorkDay: {
        nodes: [],
      },
    },
  },
  decorators: [
    (Story, context) => {
      jest.mock("gatsby", () => ({
        ...jest.requireActual("gatsby"),
        useStaticQuery: () => context.parameters.mockData,
        Link: ({ to, children }) => <a href={to}>{children}</a>,
        graphql: jest.fn(),
      }));
      return <Story />;
    },
  ],
};
