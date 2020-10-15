import { createSlice } from "@reduxjs/toolkit";
import {getTodaysDate} from "../components/HelperFunctions"
import {startOfWeek, endOfWeek, isSameDay, startOfMonth, endOfMonth, startOfYear, endOfYear, compareAsc} from "date-fns"

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
      const today = new Date().toString()
      
      const new_habit = action.payload
      new_habit["history"] = [{
        date: today,
        done: 0
      }]
      new_habit["key"] = state.habits.length.toString() // the habit's key will be its index in the habits []
      new_habit["dateCreated"] = today
      state.habits.push(action.payload)
    },
    increment: (state, action) => {
      // action.payload:
      // habitIndex: string
      // targetDate: string
      const habitIndex = Number(action.payload.habitIndex)
      const targetDate = new Date(action.payload.targetDate)
      const targetDateString = action.payload.targetDate

      // Select Habit
      const habit = state.habits[habitIndex]
      const history = habit.history
      
      for (let entry of history) {
        const entryDate = new Date(entry.date)
        //console.log("entryDate", entryDate)
        //console.log("targetDate", targetDate)
        //console.log(isSameDay(entryDate, targetDate))
        if (isSameDay(entryDate, targetDate)) {
          entry.done += 1
          return
        }
      }

      // If entry does not exist in habit's history, create one.
      history.push({date: targetDateString, done: 1})
      
    },
    decrement: (state, action) => {
      // action.payload:
      // habitIndex: string
      // targetDate: string
      const habitIndex = Number(action.payload.habitIndex)
      const targetDate = new Date(action.payload.targetDate)
      const targetDateString = action.payload.targetDate

      // Select Habit
      const habit = state.habits[habitIndex]
      const history = habit.history
      
      for (let entry of history) {
        const entryDate = new Date(entry.date)
        //console.log("entryDate", entryDate)
        //console.log("targetDate", targetDate)
        //console.log(isSameDay(entryDate, targetDate))
        if (isSameDay(entryDate, targetDate)) {
          if (entry.done !== 0) entry.done -= 1
          return
        }
      }

      // If entry does not exist in habit's history, create one.
      history.push({date: targetDateString, done: 0})
    }
  },
});

export const { changeHabit, createHabit, increment, decrement } = habitSlice.actions;

export default habitSlice.reducer;

export const selectHabit = (state: any) => state.habits.habit;
export const selectHabits = (state: any) => state.habits.habits;

export interface habitInterface {
  key: string;  // "0"
  color: string;  // "#fffff"
  goal: number;
  history: [{
    date: string // "Wed Oct 14 2020 20:03:02 GMT-0400 (Eastern Daylight Time)"
    done: number
  }]
};



// Additional functions. Not store or redux related. Saved in this file for testability.

interface entry {
  date: string,
  done: number
}
export const count_times_done_on_date = (history: entry[], date: Date) => {
  if (history.length == 0) return 0;

  for (let entry of history) {
    const entryDate = new Date(entry.date)
    if (isSameDay(entryDate, date)) {
      return entry.done
    }
  }

  // If habit does not have an entry for that date
  return 0
}

export const get_start_end_dates = (date: Date, timePeriod: string) => {
  let start_date: Date, end_date: Date
  
  switch(timePeriod){
    
    // Get Sunday and Saturday that contains the date
    case "Weekly":
      start_date = startOfWeek(date, {weekStartsOn: 0})
      end_date = endOfWeek(date, {weekStartsOn: 0})
      return [start_date, end_date]

    // Get first and last date in month that contains date
    case "Monthly":
      start_date = startOfMonth(date)
      end_date = endOfMonth(date)
      return [start_date, end_date]

    // Get first and last date of year that contains date
    case "Yearly":
      start_date = startOfYear(date)
      end_date = endOfYear(date)
      return [start_date, end_date]
  
    default:
      throw new Error("Time period must be 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' ")
  }
  
}

export const count_times_done_during_interval = (history: entry[], start_date: Date, end_date: Date) => {
  if (history.length == 0) return 0;

  let sum = 0

  for(let entry of history) {
    const entry_date = new Date(entry.date)
    if (compareAsc(start_date, entry_date) <= 0 && compareAsc(end_date, entry_date) >= 0) {
      sum += entry.done
    }
  }

  return sum
}

export const calculateHabitProgress = (habit: any, date: Date) => {  
  // args:
  // habit
  // date - the date that is currently being displayed on the homescreen UI
  // 
  // returns:
  // progress: number - Users progress for the current time period. Percentage
  // done_during_interval: number - The amount of times a user has done a habit for the selected interval
  // goal: number - ...

  let done_during_interval: number = 0;
  const goal: number = habit.goal
  
  // Count the number of times the user did the habit for this time period
  if (habit.timePeriod === "Daily") {
    done_during_interval = count_times_done_on_date( habit.history, date)
  } else {
    const [start_date, end_date] = get_start_end_dates(date, habit.timePeriod)
    done_during_interval = count_times_done_during_interval(habit.history, start_date, end_date)
  }
  
  // Calculate the users progress for the this time period
  let progress: number = done_during_interval / goal;
  progress = progress * 100;
  if (progress > 100) progress = 100
  //console.log(`progress: ${progress} done: %{done_during_interval} goal: ${goal}`);
  return [progress, done_during_interval, goal]
  
};

/** 
// Test suite for calculateHabitProgress
let testHabit = {
  goal: 3,
  timePeriod: "Weekly",
  history: []
}
testHabit.history.push({date: 'December 17, 1995 03:24:00', done: 1})
testHabit.history.push({date: 'December 31, 2019 03:24:00', done: 1})
testHabit.history.push({date: 'January 03, 2020 03:24:00', done: 1})
testHabit.history.push({date: 'October 13, 2020 03:24:00', done: 3})
testHabit.history.push({date: 'October 14, 2020 03:24:00', done: 3})

// #1
let res = calculateHabitProgress(testHabit, new Date('October 14, 2020 03:24:00'))
console.log(res)




// Test Suite for get_habit_history_entry
const today = new Date()
const hist = [{
    date: today.toString(),
    done: 2
}]

// # 1
res = count_times_done_on_date(hist, today)
console.log(res) // should be 2

// # 2 
// History has no entry for yesterday. Should return 0
let yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
res = count_times_done_on_date(hist, yesterday)
console.log(res)




// Test suite for get_start_end_dates:

// #1
// Get start and end dates for a week
const [start_date, end_date] = get_start_end_dates(today, "Weekly")
console.log(start_date, end_date)



// Test suite for count_times_done_during_interval
const big_history = []
big_history.push({date: 'December 17, 1995 03:24:00', done: 1})
big_history.push({date: 'December 31, 2019 03:24:00', done: 1})
big_history.push({date: 'January 03, 2020 03:24:00', done: 1})
big_history.push({date: 'October 13, 2020 03:24:00', done: 3})
big_history.push({date: 'October 14, 2020 03:24:00', done: 3})

// #1
// Yearly
res = count_times_done_during_interval(big_history, new Date('January 01, 1995 00:00:00'), new Date('December 31, 1995 23:59:59.999'))
console.log(res) // should be 1

// #2
// Weekly overlapp year
res = count_times_done_during_interval(big_history, new Date('December 29, 2019 00:00:00'), new Date('January 04, 2020 23:59:59.999'))
console.log(res) // should be 2

// #3
// Monthly
res = count_times_done_during_interval(big_history, new Date('October 01, 2020 00:00:00'), new Date('October 31, 2020 23:59:59.999'))
console.log(res) // should be 6
*/
