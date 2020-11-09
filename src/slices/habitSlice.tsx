import { createSlice } from "@reduxjs/toolkit";
import {
  startOfWeek,
  endOfWeek,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  compareAsc,
  startOfDay,
} from "date-fns";
import { habit, segment } from "../interfaces/interfaces";
import { insert } from "../functions/insert";
import removeActivityEntry from "../functions/removeActivityEntry";

// TODO: create interface for habits array

export const habitSlice = createSlice({
  name: "habit",
  initialState: {
    habits: [] as any,
  },
  reducers: {
    createHabit: (state, action) => {
      const habitFormData = action.payload;
      const beginningOfToday = startOfDay(new Date()).toString();
      const newHabit: habit = {
        dateCreated: beginningOfToday,
        timeline: [
          {
            startDate: beginningOfToday,
            endDate: undefined,
            name: habitFormData.name,
            description: habitFormData.description,
            goal: habitFormData.goal,
            timePeriod: habitFormData.timePeriod,
            color: habitFormData.habitColor,
            activityLog: [], // empty on purpose
          },
        ],
      };
      console.log(newHabit);
      state.habits.push(newHabit);
    },
    editHabit: (state, action) => {
      //const modifiedHabit = action.payload;
      //const originalHabit = state.habits[modifiedHabit.habitIndex];
      //const today = new Date().toString();

      console.log("editHabit not yet implemented yet");
    },
    deleteHabit: (state, action) => {
      console.log("deleteHabit not yet implemented yet");
    },
    increment: (state, action) => {
      // action.payload:
      // targetDate: string
      const date = new Date(action.payload);
      const oldTimeline: segment[] = state.habits[0].timeline;
      const newTimeline: segment[] = insert(oldTimeline, date);
      state.habits[0].timeline = newTimeline;
    },
    decrement: (state, action) => {
      // action.payload:
      // targetDate: string
      const date = new Date(action.payload);
      const oldTimeline: segment[] = state.habits[0].timeline;
      const newTimeline: segment[] = removeActivityEntry(oldTimeline, date);
      state.habits[0].timeline = newTimeline;
    },
    createTestHabit: (state) => {
      const dateCreated = new Date(2020, 9, 25, 0, 0, 0).toString();
      const testHabit: habit = {
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
      state.habits.push(testHabit);
      console.log(state.habits[0]);
    },
  },
});

export const {
  createHabit,
  editHabit,
  deleteHabit,
  increment,
  decrement,
  createTestHabit,
} = habitSlice.actions;

export default habitSlice.reducer;

export const selectHabit = (state: any) => state.habits.habits[0];
export const selectHabits = (state: any) => state.habits.habits;