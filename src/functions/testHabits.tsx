import { habit, segment } from "../interfaces/interfaces";

const dateCreated = new Date(2020, 9, 25, 0, 0, 0).toString();

export const testHabit2: habit = {
  dateCreated: dateCreated,
  timeline: [
    {
      startDate: dateCreated, // Oct 25, (beg of Sun)
      endDate: new Date(2020, 9, 31, 23, 59, 59, 999).toString(), // Oct 31, (end of Sat)
      name: "Wake Up before 8 AM",
      description: "Show my sincerity",
      goal: 5,
      timePeriod: "Weekly",
      color: "#D0021B",
      activityLog: [
        {
          date: new Date(2020, 9, 26, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 27, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 28, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 29, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 30, 0, 0, 0).toString(),
          done: 1,
        },
      ],
    },
    {
      startDate: new Date(2020, 10, 1, 0, 0, 0).toString(), // Nov 1, (beg of Sun)
      endDate: undefined,
      name: "Wake Up before 8 AM",
      description: "Show my sincerity. Going strong",
      goal: 5,
      timePeriod: "Weekly",
      color: "#D0021B",
      activityLog: [
        {
          date: new Date(2020, 10, 2, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 10, 3, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 10, 4, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 10, 5, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 10, 6, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 10, 9, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 10, 10, 0, 0, 0).toString(),
          done: 1,
        },
      ],
    },
  ],
};

export const testHabit1: habit = {
  dateCreated: dateCreated,
  timeline: [
    {
      startDate: dateCreated, // Oct 25, (beg of Sun)
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
      startDate: new Date(2020, 10, 2, 0, 0, 0).toString(), // Nov 2, (beg of Mon) (today)
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
  ],
};
