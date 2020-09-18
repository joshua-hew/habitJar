import { createSlice } from "@reduxjs/toolkit";

export const habitSlice = createSlice({
  name: "habit",
  initialState: {
    habit: "No Habit",
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
