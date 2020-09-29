import { createSlice } from "@reduxjs/toolkit";

export const habitSlice = createSlice({
  name: "habit",
  initialState: {
    habit: "No Habit",
    habits: [""],
  },
  reducers: {
    changeHabit: (state, action) => {
      state.habit = action.payload;
    },
  },
});

export const { changeHabit } = habitSlice.actions;

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
