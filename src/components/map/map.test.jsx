import React from "react";
import { render } from "@testing-library/react";
import Map from "./map";
import { centreOfFoxleyWood } from "../../helpers/parse-meeting-point";

jest.mock("react-map-gl/maplibre", () => ({
  Map: jest.fn(({ children }) => <div data-testid="maplibre">{children}</div>),
  Marker: jest.fn(({ children }) => (
    <div data-testid="marker">{children}</div>
  )),
  NavigationControl: jest.fn(() => <div data-testid="navigation-control" />),
}));

const {
  Map: MockMapLibre,
  Marker: MockMarker,
} = require("react-map-gl/maplibre");

describe("Map", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, GATSBY_MAPLIBRE_API_KEY: "test-api-key" };
    MockMapLibre.mockClear();
    MockMarker.mockClear();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it("returns null when GATSBY_MAPLIBRE_API_KEY is not defined", () => {
    delete process.env.GATSBY_MAPLIBRE_API_KEY;
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const { container } = render(<Map />);

    expect(container.innerHTML).toBe("");
    expect(consoleSpy).toHaveBeenCalledWith(
      "GATSBY_MAPLIBRE_API_KEY is not defined, so didn't load the map",
    );
  });

  it("renders the map container when API key is set", () => {
    const { getByTestId } = render(<Map />);

    expect(getByTestId("maplibre")).toBeInTheDocument();
  });

  it("uses centre of Foxley Wood as default coordinates", () => {
    render(<Map />);

    const mapProps = MockMapLibre.mock.calls[0][0];
    expect(mapProps.initialViewState).toEqual({
      longitude: centreOfFoxleyWood.longitude,
      latitude: centreOfFoxleyWood.latitude,
      zoom: 12,
    });
  });

  it("passes custom coordinates to the map and marker", () => {
    render(<Map markerLatitude={51.5} markerLongitude={-0.1} />);

    const mapProps = MockMapLibre.mock.calls[0][0];
    expect(mapProps.initialViewState.latitude).toBe(51.5);
    expect(mapProps.initialViewState.longitude).toBe(-0.1);

    const markerProps = MockMarker.mock.calls[0][0];
    expect(markerProps.latitude).toBe(51.5);
    expect(markerProps.longitude).toBe(-0.1);
  });

  it("passes zoom configuration to the map", () => {
    render(<Map minZoom={8} maxZoom={15} zoom={14} />);

    const mapProps = MockMapLibre.mock.calls[0][0];
    expect(mapProps.minZoom).toBe(8);
    expect(mapProps.maxZoom).toBe(15);
    expect(mapProps.initialViewState.zoom).toBe(14);
  });

  it("renders the pin with default red colour", () => {
    const { container } = render(<Map />);

    const pin = container.querySelector("svg path");
    expect(pin).toHaveAttribute("fill", "red");
  });

  it("renders the pin with a custom colour", () => {
    const { container } = render(<Map pinColour="blue" />);

    const pin = container.querySelector("svg path");
    expect(pin).toHaveAttribute("fill", "blue");
  });

  it("renders the navigation control", () => {
    const { getByTestId } = render(<Map />);

    expect(getByTestId("navigation-control")).toBeInTheDocument();
  });

  it("constructs the correct MapTiler style URL", () => {
    render(<Map />);

    const mapProps = MockMapLibre.mock.calls[0][0];
    expect(mapProps.mapStyle).toBe(
      "https://api.maptiler.com/maps/streets/style.json?key=test-api-key",
    );
  });
});
