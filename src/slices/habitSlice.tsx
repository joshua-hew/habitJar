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
import { testHabit2 } from "../functions/testHabits";
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
      console.log(action.payload);
      console.log("editHabit not yet implemented yet");
    },
    deleteHabit: (state) => {
      state.habits = [];
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
      state.habits = [testHabit2];
      console.log("testHabit2 created");
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
