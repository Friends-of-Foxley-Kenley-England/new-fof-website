import { parseMeetingPoint } from "./parse-meeting-point";

const woodlandWayDescription = "At the entrance in Woodland Way";

const picnicTablesDescription =
  "At the picnic tables located along the top path where Sherwood Oaks Field starts";

const burwoodAvenueDescription = "At the entrance of Burwood Avenue";

describe("parseMeetingPoint", () => {
  it.each`
    contentfulMeetingPoint     | expected
    ${null}                    | ${null}
    ${undefined}               | ${null}
    ${"unknown.location.here"} | ${undefined}
  `(
    "returns [$expected] when contentfulMeetingPoint is [$contentfulMeetingPoint]",
    ({ contentfulMeetingPoint, expected }) => {
      const result = parseMeetingPoint(contentfulMeetingPoint);
      expect(result).toBe(expected);
    },
  );

  it.each`
    contentfulMeetingPoint                | expectedW3w             | expectedDescription
    ${"tune.then.global"}                 | ${"tune.then.global"}   | ${burwoodAvenueDescription}
    ${"loves.final.needed"}               | ${"loves.final.needed"} | ${woodlandWayDescription}
    ${"drives.slime.gates"}               | ${"drives.slime.gates"} | ${picnicTablesDescription}
    ${"tune.then.global some extra text"} | ${"tune.then.global"}   | ${burwoodAvenueDescription}
  `(
    "returns correct meeting point info for [$contentfulMeetingPoint]",
    ({ contentfulMeetingPoint, expectedW3w, expectedDescription }) => {
      const result = parseMeetingPoint(contentfulMeetingPoint);

      expect(result).toEqual({
        meetingPointWhatThreeWords: expectedW3w,
        meetingPointDescription: expectedDescription,
      });
    },
  );
});
