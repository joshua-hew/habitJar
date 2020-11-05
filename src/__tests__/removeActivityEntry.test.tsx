import { segment } from "../interfaces/interfaces";
import removeActivityEntry from "../functions/removeActivityEntry";

describe("Test suite for removeActiveEntry function", () => {
  const today = new Date(2020, 10, 2, 21, 39, 0); // pretend today is Nov 2, 2020 9:39:00 pm
  const dateCreated = new Date(2020, 9, 25, 0, 0, 0); // pretend this habit was created last Sunday
  const mockTimeline: segment[] = [
    {
      startDate: dateCreated.toString(), // Oct 25, (beg of Sun)
      endDate: undefined,
      name: "",
      description: "",
      goal: 0,
      timePeriod: "",
      color: "",
      activityLog: [
        {
          date: dateCreated.toString(),
          done: 1,
        },
        {
          date: dateCreated.toString(),
          done: 1,
        },
        {
          date: today.toString(),
          done: 1,
        },
      ],
    },
  ];

  it("does nothing if the date is before the earliest segment", () => {
    const t1 = removeActivityEntry(mockTimeline, new Date(2020, 1, 1));
    expect(t1).toStrictEqual(mockTimeline);
  });

  it("only removes one entry, given that there are duplicates in the activityLog", () => {
    const t1 = removeActivityEntry(mockTimeline, new Date(2020, 9, 25));
    expect(t1[0].activityLog.length).toBe(2);
  });
});
