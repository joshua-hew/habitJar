import { createSlice } from "@reduxjs/toolkit";
import {getTodaysDate} from "../components/HelperFunctions"

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
      console.log(action.payload)
      
      // Get today's date
      const today_string = getTodaysDate()
      
      const new_habit = action.payload
      new_habit["history"] = {
        today_string: {
          done: 0
        }
      }
      new_habit["key"] = new_habit.name
      state.habits.push(action.payload)
    },
  },
});

export const { changeHabit, createHabit } = habitSlice.actions;

export default habitSlice.reducer;

export const selectHabit = (state: any) => state.habits.habit;
export const selectHabits = (state: any) => state.habits.habits;

export interface habitInterface {
  key: string;
  color: string;
  history: {
    [date: string]: {
      goal: number;
      done: number;
    };
  };
}
