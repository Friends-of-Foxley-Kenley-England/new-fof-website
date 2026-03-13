import LocationMap from "./location-map";
import {
  centreOfFoxleyWood,
  locationMappings,
} from "../../helpers/parse-meeting-point";

const meetingPointOne = locationMappings[0];
const meetingPointTwo = locationMappings[1];
const meetingPointThree = locationMappings[2];

export default {
  title: "Components/LocationMap",
  component: LocationMap,
  tags: ["autodocs"],
  argTypes: {
    pinColour: {
      control: "color",
      description: "Colour of the map pin marker",
    },
    markerLatitude: {
      control: { type: "number", step: 0.001 },
      description: "Latitude for the marker position",
    },
    markerLongitude: {
      control: { type: "number", step: 0.001 },
      description: "Longitude for the marker position",
    },
    minZoom: {
      control: { type: "number", min: 0, max: 20 },
      description: "Minimum zoom level",
    },
    maxZoom: {
      control: { type: "number", min: 0, max: 20 },
      description: "Maximum zoom level",
    },
    zoom: {
      control: { type: "number", min: 0, max: 20 },
      description: "Initial zoom level",
    },
  },
  args: {
    markerLatitude: centreOfFoxleyWood.latitude,
    markerLongitude: centreOfFoxleyWood.longitude,
    minZoom: 10,
    maxZoom: 20,
    zoom: 16,
  },
};

export const Default = {
  args: {
    zoom: 16,
  },
};

export const CustomPinColour = {
  args: {
    pinColour: "#2563eb",
  },
};

export const ZoomedIn = {
  args: {
    zoom: 15,
    minZoom: 12,
    maxZoom: 18,
  },
};

export const CentreOfFoxleyWood = {
  args: {
    markerLatitude: centreOfFoxleyWood.latitude,
    markerLongitude: centreOfFoxleyWood.longitude,
  },
};

export const MeetingPointOne = {
  args: {
    markerLatitude: meetingPointOne.latitude,
    markerLongitude: meetingPointOne.longitude,
  },
  decorators: [
    Story => (
      <div style={{ padding: "20px" }}>
        <h2>{meetingPointOne.meetingPointWhatThreeWords}</h2>
        <p>{meetingPointOne.meetingPointDescription}</p>
        <Story />
      </div>
    ),
  ],
};

export const MeetingPointTwo = {
  args: {
    markerLatitude: meetingPointTwo.latitude,
    markerLongitude: meetingPointTwo.longitude,
  },
  decorators: [
    Story => (
      <div style={{ padding: "20px" }}>
        <h2>{meetingPointTwo.meetingPointWhatThreeWords}</h2>
        <p>{meetingPointTwo.meetingPointDescription}</p>
        <Story />
      </div>
    ),
  ],
};

export const MeetingPointThree = {
  args: {
    markerLatitude: meetingPointThree.latitude,
    markerLongitude: meetingPointThree.longitude,
    zoom: 16,
  },
  decorators: [
    Story => (
      <div style={{ padding: "20px" }}>
        <h2>{meetingPointThree.meetingPointWhatThreeWords}</h2>
        <p>{meetingPointThree.meetingPointDescription}</p>
        <Story />
      </div>
    ),
  ],
};
