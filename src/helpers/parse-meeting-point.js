const locationMappings = [
  {
    meetingPointWhatThreeWords: "tune.then.global",
    meetingPointDescription: "At the entrance of Burwood Avenue",
  },
  {
    meetingPointWhatThreeWords: "loves.final.needed",
    meetingPointDescription: "At the entrance in Woodland Way",
  },
  {
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
