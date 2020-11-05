import { segment } from "../interfaces/interfaces";
import getIndexOfSegment from "../functions/getIndexOfSegment";

describe("Test suite for getIndexOfSegment function", () => {
  const today = new Date(2020, 10, 2, 21, 39, 0); // pretend today is Nov 2, 2020 9:39:00 pm
  const dateCreated = new Date(2020, 9, 25, 0, 0, 0); // pretend this habit was created last Sunday
  const mockTimeline: segment[] = [
    {
      startDate: dateCreated.toString(), // Oct 25, (beg of Sun)
      endDate: new Date(2020, 9, 31, 23, 59, 59, 999).toString(), // Oct 31, (end of Sat)
      name: "",
      description: "",
      goal: 0,
      timePeriod: "",
      color: "",
      activityLog: [], // empty on purpose
    },
    {
      startDate: new Date(2020, 10, 1, 0, 0, 0).toString(), // Nov 1, (beg of Sun)
      endDate: new Date(2020, 10, 1, 23, 59, 59, 999).toString(), // Nov 1, (end of Sun)
      name: "",
      description: "",
      goal: 0,
      timePeriod: "",
      color: "",
      activityLog: [],
    },
    {
      startDate: new Date(2020, 10, 2, 0, 0, 0).toString(), // Nov 2, (beg of Mon)
      endDate: undefined,
      name: "",
      description: "",
      goal: 0,
      timePeriod: "",
      color: "",
      activityLog: [
        {
          date: new Date(2020, 10, 2, 14, 30, 0).toString(), // Nov 2, 2:30 pm
          done: 1,
        },
      ],
    },
  ];

  it("should return -1 if the date is before the earliest segment", () => {
    const index = getIndexOfSegment(mockTimeline, new Date(2020, 1, 1));
    expect(index).toBe(-1);
  });

  it("should return 0 if the date is within the first segment", () => {
    const index = getIndexOfSegment(mockTimeline, new Date(2020, 9, 30));
    expect(index).toBe(0);
  });

  it("should return 1 if the date is within the second segment", () => {
    const index = getIndexOfSegment(mockTimeline, new Date(2020, 10, 1));
    expect(index).toBe(1);
  });

  it("should return 2 if the date is after the start date of the last / current segment", () => {
    const index = getIndexOfSegment(mockTimeline, new Date(2020, 10, 3));
    expect(index).toBe(2);
  });
});
