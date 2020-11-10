import { habit, segment } from "../interfaces/interfaces";

const dateCreated = new Date(2020, 9, 25, 0, 0, 0).toString();

export const testHabit2: habit = {
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
      activityLog: [],
    },
    {
      startDate: new Date(2020, 10, 1, 0, 0, 0).toString(), // Nov 1, (beg of Sun)
      endDate: undefined,
      name: "",
      description: "",
      goal: 0,
      timePeriod: "",
      color: "",
      activityLog: [],
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
