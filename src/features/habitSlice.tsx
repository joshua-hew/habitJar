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
} from "date-fns";

// TODO: create interface for habits array

export const habitSlice = createSlice({
  name: "habit",
  initialState: {
    habit: "No Habit",
    habits: [] as any,
  },
  reducers: {
    changeHabit: (state, action) => {
      state.habit = action.payload;
    },
    createHabit: (state, action) => {
      console.log(`hey there! action.payload:`);
      console.log(action.payload);

      const new_habit = action.payload;
      const today = new Date().toString();
      const initialHistory = [
        {
          date: today,
          done: 0,
        },
      ];

      // Add additional fields to habit object

      new_habit["history"] = initialHistory;
      new_habit["key"] = state.habits.length.toString(); // the habit's key will be its index in the habits []
      new_habit["dateCreated"] = today;
      new_habit["lastModified"] = ""; // intialize as "". Will hold a string Date
      state.habits.push(action.payload);
    },
    editHabit: (state, action) => {
      const modifiedHabit = action.payload;
      const originalHabit = state.habits[modifiedHabit.habitIndex];
      const today = new Date().toString();

      modifiedHabit["lastModified"] = today;
      Object.assign(originalHabit, modifiedHabit);
    },
    deleteHabit: (state, action) => {
      const habitIndex = Number(action.payload);
      state.habits.splice(habitIndex, 1);

      // re-assign keys
      const reassignKeys = (value: any, index: number, array: []) => {
        value["key"] = index.toString();
        return value;
      };
      state.habits = state.habits.map(reassignKeys);
    },
    increment: (state, action) => {
      // action.payload:
      // habitIndex: string
      // targetDate: string
      const habitIndex = Number(action.payload.habitIndex);
      const targetDate = new Date(action.payload.targetDate);
      const targetDateString = action.payload.targetDate;

      // Select Habit
      const habit = state.habits[habitIndex];
      const history = habit.history;

      for (let entry of history) {
        const entryDate = new Date(entry.date);
        //console.log("entryDate", entryDate)
        //console.log("targetDate", targetDate)
        //console.log(isSameDay(entryDate, targetDate))
        if (isSameDay(entryDate, targetDate)) {
          entry.done += 1;
          return;
        }
      }

      // If entry does not exist in habit's history, create one.
      history.push({ date: targetDateString, done: 1 });
    },
    decrement: (state, action) => {
      // action.payload:
      // habitIndex: string
      // targetDate: string
      const habitIndex = Number(action.payload.habitIndex);
      const targetDate = new Date(action.payload.targetDate);
      const targetDateString = action.payload.targetDate;

      // Select Habit
      const habit = state.habits[habitIndex];
      const history = habit.history;

      for (let entry of history) {
        const entryDate = new Date(entry.date);
        //console.log("entryDate", entryDate)
        //console.log("targetDate", targetDate)
        //console.log(isSameDay(entryDate, targetDate))
        if (isSameDay(entryDate, targetDate)) {
          if (entry.done !== 0) entry.done -= 1;
          return;
        }
      }

      // If entry does not exist in habit's history, create one.
      history.push({ date: targetDateString, done: 0 });
    },
  },
});

export const {
  changeHabit,
  createHabit,
  editHabit,
  deleteHabit,
  increment,
  decrement,
} = habitSlice.actions;

export default habitSlice.reducer;

export const selectHabit = (state: any) => state.habits.habit;
export const selectHabits = (state: any) => state.habits.habits;

export interface habitInterface {
  key: string; // "0"
  color: string; // "#fffff"
  goal: number;
  history: [
    {
      date: string; // "Wed Oct 14 2020 20:03:02 GMT-0400 (Eastern Daylight Time)"
      done: number;
    }
  ];
}
