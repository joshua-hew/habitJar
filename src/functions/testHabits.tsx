import { habit, segment } from "../interfaces/interfaces";

const dateCreated = new Date(2020, 8, 15, 0, 0, 0).toString(); // Sept 15, (beg of Mon)

export const testHabit2: habit = {
  dateCreated: dateCreated,
  key: "no key",
  timeline: [
    {
      startDate: dateCreated,
      endDate: new Date(2020, 9, 6, 23, 59, 59, 999).toString(), // Oct 6, (end of Tue)
      name: "Do work for Senior Project",
      description: "Use Pomodoro, focus on choosing a task and finishing it.",
      goal: 5,
      timePeriod: "Weekly",
      color: "#D0021B",
      activityLog: [
        {
          date: new Date(2020, 8, 15, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 8, 17, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 8, 18, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 8, 21, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 8, 23, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 8, 29, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 1, 0, 0, 0).toString(),
          done: 1,
        },
      ],
    },
    {
      startDate: new Date(2020, 9, 7, 0, 0, 0).toString(), // Oct 7
      endDate: undefined,
      name: "Work on Senior Project",
      description: "Do 4 hours Pomodoro.",
      goal: 5,
      timePeriod: "Weekly",
      color: "#7ED321",
      activityLog: [
        {
          date: new Date(2020, 9, 8, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 10, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 12, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 13, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 14, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 15, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 19, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 20, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 21, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 22, 0, 0, 0).toString(),
          done: 1,
        },
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
          date: new Date(2020, 9, 30, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 9, 31, 0, 0, 0).toString(),
          done: 1,
        },
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
          date: new Date(2020, 10, 9, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 10, 10, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 10, 2, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 10, 19, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 10, 20, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 11, 1, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 11, 2, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 11, 3, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 11, 4, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 11, 5, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 11, 7, 0, 0, 0).toString(),
          done: 1,
        },
        {
          date: new Date(2020, 11, 8, 0, 0, 0).toString(),
          done: 1,
        },
      ],
    },
  ],
};

export const testHabit1: habit = {
  dateCreated: dateCreated,
  key: "no key",
  timeline: [
    {
      startDate: dateCreated,
      endDate: new Date(2020, 9, 31, 23, 59, 59, 999).toString(), // Oct 31, (end of Sat)
      name: "Meditate",
      description: "Get the right mindset for the day",
      goal: 1,
      timePeriod: "Daily",
      color: "#8B572A",
      activityLog: [], // empty on purpose
    },
    {
      startDate: new Date(2020, 10, 1, 0, 0, 0).toString(), // Nov 1, (beg of Sun)
      endDate: new Date(2020, 10, 1, 23, 59, 59, 999).toString(), // Nov 1, (end of Sun)
      name: "Meditate",
      description: "Get the right mindset for the day. Changed 1",
      goal: 1,
      timePeriod: "Daily",
      color: "#8B572A",
      activityLog: [],
    },
    {
      startDate: new Date(2020, 10, 2, 0, 0, 0).toString(), // Nov 2, (beg of Mon) (today)
      endDate: undefined,
      name: "Meditate",
      description: "Get the right mindset for the day. Changed 2",
      goal: 1,
      timePeriod: "Daily",
      color: "#8B572A",
      activityLog: [
        {
          date: new Date(2020, 10, 2, 14, 30, 0).toString(), // Nov 2, 2:30 pm
          done: 1,
        },
      ],
    },
  ],
};
