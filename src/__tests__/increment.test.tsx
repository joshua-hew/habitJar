import { segment } from "../interfaces/interfaces";
import { insert } from "../functions/insert";

describe("Test suite for increment function", () => {
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

  // #first segment #empty
  it("adds an activity_entry when activityLog is empty", () => {
    const d = new Date(2020, 9, 26, 14, 0, 0); // Oct 26, Mon 2:00 pm
    const res = insert(mockTimeline, d);
    const val = [
      {
        date: d.toString(),
        done: 1,
      },
    ];
    expect(res[0].activityLog).toEqual(val);
    expect(mockTimeline[0].startDate).toStrictEqual(res[0].startDate);
    expect(mockTimeline[0].endDate).toStrictEqual(res[0].endDate);
  });

  // #first segment #sort
  it("it finds the correct segment (1st), inserts into activityLog, and sorts", () => {
    const d1 = new Date(2020, 9, 28, 14, 0, 0);
    const d2 = new Date(2020, 9, 27, 14, 0, 0);
    const t1 = insert(mockTimeline, d1);
    const t2 = insert(t1, d2);
    expect(t2[0].startDate).toStrictEqual(mockTimeline[0].startDate);
    expect(t2[0].endDate).toStrictEqual(mockTimeline[0].endDate);
    const val = [
      {
        date: d2.toString(),
        done: 1,
      },
      {
        date: d1.toString(),
        done: 1,
      },
    ];
    expect(t2[0].activityLog).toStrictEqual(val);
  });

  // #first segment #boundary #empty
  it("it correctly inserts into first segment when date === first segment startDate", () => {
    const d = new Date(2020, 9, 25, 0, 0, 0);
    const t = insert(mockTimeline, d);
    expect(t[0].startDate).toStrictEqual(mockTimeline[0].startDate);
    expect(t[0].endDate).toStrictEqual(mockTimeline[0].endDate);
    const val = [
      {
        date: d.toString(),
        done: 1,
      },
    ];
    expect(t[0].activityLog).toStrictEqual(val);
  });

  // #first segment #boundary #empty
  it("it correctly inserts into first segment when date === first segment endDate", () => {
    const d = new Date(2020, 9, 31, 23, 59, 59, 999);
    const t = insert(mockTimeline, d);
    expect(t[0].startDate).toStrictEqual(mockTimeline[0].startDate);
    expect(t[0].endDate).toStrictEqual(mockTimeline[0].endDate);
    const val = [
      {
        date: d.toString(),
        done: 1,
      },
    ];
    expect(t[0].activityLog).toStrictEqual(val);
  });

  // #second segment #empty
  it("correctly inserts into the second segment", () => {
    const d = new Date(2020, 10, 1, 14, 30, 0);
    const t = insert(mockTimeline, d);
    expect(t[1].startDate).toStrictEqual(mockTimeline[1].startDate);
    expect(t[1].endDate).toStrictEqual(mockTimeline[1].endDate);
    const val = [
      {
        date: d.toString(),
        done: 1,
      },
    ];
    expect(t[1].activityLog).toStrictEqual(val);
  });

  // #second segment #boundary #empty
  it("inserts into second segment when date === startDate", () => {
    const d = new Date(2020, 10, 1, 0, 0, 0);
    const t = insert(mockTimeline, d);
    expect(t[1].startDate).toStrictEqual(mockTimeline[1].startDate);
    expect(t[1].endDate).toStrictEqual(mockTimeline[1].endDate);
    const val = [
      {
        date: d.toString(),
        done: 1,
      },
    ];
    expect(t[1].activityLog).toStrictEqual(val);
  });

  // #second segment #boundary #empty
  it("inserts into second segment when date === endDate", () => {
    const d = new Date(2020, 10, 1, 23, 59, 59, 999);
    const t = insert(mockTimeline, d);
    expect(t[1].startDate).toStrictEqual(mockTimeline[1].startDate);
    expect(t[1].endDate).toStrictEqual(mockTimeline[1].endDate);
    const val = [
      {
        date: d.toString(),
        done: 1,
      },
    ];
    // lol wut???
    //console.log(isAfter(new Date(d), new Date(mockTimeline[1].endDate)));
    //console.log(d, mockTimeline[1].endDate);
    expect(t[1].activityLog).toStrictEqual(val);
  });

  // #new segment
  it("creates a new segment, and inserts it at the beginning of the timeline when incrementing before the start date of the earliest segment", () => {
    const d = new Date(2020, 9, 23, 12, 0, 0, 0);
    const t = insert(mockTimeline, d);
    expect(t[0].startDate).toStrictEqual(
      new Date(2020, 9, 23, 0, 0, 0, 0).toString()
    );
    expect(t[0].endDate).toStrictEqual(
      new Date(2020, 9, 24, 23, 59, 59, 999).toString()
    );
    const val = [
      {
        date: d.toString(),
        done: 1,
      },
    ];
    expect(t[0].activityLog).toStrictEqual(val);
    expect(t.length).toBe(4);
  });

  // #present segment #sorted
  it("correctly inserts into the present segment", () => {
    const d = new Date(2020, 11, 23, 12, 0, 0, 0);
    const t = insert(mockTimeline, d);
    expect(t[2].startDate).toStrictEqual(mockTimeline[2].startDate);
    expect(t[2].endDate).toStrictEqual(undefined);
    const val = [
      {
        date: new Date(2020, 10, 2, 14, 30, 0).toString(),
        done: 1,
      },
      {
        date: d.toString(),
        done: 1,
      },
    ];
    expect(t[2].activityLog).toStrictEqual(val);
  });

  it("works for single segment timeline", () => {
    //
  });
});

// Bugs when making an edit:
// 1.
// increment on Sunday Nov 1, 200 2:00 pm
// make edit to habit on same day
// endDate for that seg now Sat Oct 31, 2020, 23:59:59
// that segment contains an invalid entry because it occurs after the end date

// 2.
// today is Sunday Nov 1, 2020
// increment on a future date Friday Nov 6, 2020
// before Friday comes, make edit to habit on Wed, Nov 4 2020
// old Seg = [startDate, Tue (end)]
// new seg = [Wed (beg), undefined]
// old seg stil contains invalid activity_entry because it occurs after end date
