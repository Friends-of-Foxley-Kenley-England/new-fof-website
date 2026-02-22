export const centreOfFoxleyWood = {
  longitude: -0.111118,
  latitude: 51.325829,
};

export const locationMappings = [
  {
    latitude: 51.326099,
    longitude: -0.110349,
    meetingPointWhatThreeWords: "tune.then.global",
    meetingPointDescription: "At the entrance of Burwood Avenue",
  },
  {
    latitude: 51.330356,
    longitude: -0.116181,
    meetingPointWhatThreeWords: "loves.final.needed",
    meetingPointDescription: "At the entrance in Woodland Way",
  },
  {
    latitude: 51.326684,
    longitude: -0.112252,
    meetingPointWhatThreeWords: "drives.slime.gates",
    meetingPointDescription:
      "At the picnic tables located along the top path where Sherwood Oaks Field starts",
  },
];

export const parseMeetingPoint = contentfulMeetingPoint => {
  if (!contentfulMeetingPoint) {
    return null;
  }

  const whatThreeWords = contentfulMeetingPoint.split(" ")[0];

  const meetingPoint = locationMappings.find(
    x => x.meetingPointWhatThreeWords === whatThreeWords,
  );

  return meetingPoint;
};
