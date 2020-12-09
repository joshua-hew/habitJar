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
  endOfYesterday,
} from "date-fns";
import { habit, journalEntry, segment } from "../interfaces/interfaces";
import { testHabit1, testHabit2 } from "../functions/testHabits";
import { insert } from "../functions/insert";
import removeActivityEntry from "../functions/removeActivityEntry";
import { endOfDay } from "date-fns/esm";

// TODO: create interface for habits array

export const habitSlice = createSlice({
  name: "habit",
  initialState: {
    habits: [] as any,
    journal: [] as any,
  },
  reducers: {
    createHabit: (state, action) => {
      const habitFormData = action.payload;
      const beginningOfToday = startOfDay(new Date()).toString();
      const newHabit: habit = {
        dateCreated: beginningOfToday,
        key: state.habits.length.toString(),
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
      state.habits.push(newHabit);
    },
    editHabit: (state, action) => {
      const [formData, option, index] = action.payload;

      console.log(formData, option);

      const habit = state.habits[index];
      if (option === "changeAll") {
        for (let seg of habit.timeline) {
          seg.name = formData.name;
          seg.description = formData.description;
          seg.goal = formData.goal;
          seg.timePeriod = formData.timePeriod;
          seg.color = formData.habitColor;
        }
      } else if (option === "changeGoingForward") {
        const currentSegmentStartDate = new Date(
          habit.timeline[habit.timeline.length - 1].startDate
        );
        if (isSameDay(new Date(), currentSegmentStartDate)) {
          const currentSegment = habit.timeline[habit.timeline.length - 1];
          currentSegment.name = formData.name;
          currentSegment.description = formData.description;
          currentSegment.goal = formData.goal;
          currentSegment.timePeriod = formData.timePeriod;
          currentSegment.color = formData.habitColor;
        } else {
          // end current segment
          habit.timeline[
            habit.timeline.length - 1
          ].endDate = endOfYesterday().toString();

          // create a new segment
          const newSegment: segment = {
            startDate: startOfDay(new Date()).toString(),
            endDate: undefined,
            name: formData.name,
            description: formData.description,
            goal: formData.goal,
            timePeriod: formData.timePeriod,
            color: formData.habitColor,
            activityLog: [],
          };
          habit.timeline.push(newSegment);

          // check that activity log entries for each segment is valid
          console.log("Activity log check Not Implemented Yet");
        }
      }
    },
    deleteHabit: (state, action) => {
      const index = action.payload;
      state.habits.splice(index, 1);
      state.habits.forEach((value: any, index: any) => {
        value.key = index.toString();
      });
    },
    increment: (state, action) => {
      // action.payload:
      // targetDate: string
      const date = new Date(action.payload);
      const oldTimeline: segment[] = state.habits[0].timeline;
      const newTimeline: segment[] = insert(oldTimeline, date);
      state.habits[0].timeline = newTimeline;
    },
    markComplete: (state, action) => {
      const date = new Date(action.payload.date); // arg
      const index = action.payload.index; // arg
      const habit = state.habits[index];
      const newTimeline: segment[] = insert(habit.timeline, date);
      habit.timeline = newTimeline;
    },
    markIncomplete: (state, action) => {
      const date = new Date(action.payload.date); // arg
      const index = action.payload.index; // arg
      const habit = state.habits[index];
      const newTimeline: segment[] = removeActivityEntry(habit.timeline, date);
      habit.timeline = newTimeline;
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
      console.log("create test habit called");
      testHabit2.key = state.habits.length.toString();
      state.habits.push(testHabit2);
      testHabit1.key = state.habits.length.toString();
      state.habits.push(testHabit1);
      console.log(state);
    },
    createJournalEntry: (state, action) => {
      const payload = action.payload;
      state.journal.push(payload);
    },
    editJournalEntry: (state, action) => {
      const editedJournalEntry: journalEntry = action.payload.editedNote;
      const index = action.payload.index;
      state.journal[index] = editedJournalEntry;
    },
    deleteJournalEntry: (state, action) => {
      const index = action.payload;
      state.journal.splice(index, 1);
    },
  },
});

export const {
  createHabit,
  editHabit,
  deleteHabit,
  increment,
  decrement,
  markComplete,
  markIncomplete,
  createTestHabit,
  createJournalEntry,
  editJournalEntry,
  deleteJournalEntry,
} = habitSlice.actions;

export default habitSlice.reducer;

export const selectHabit = (state: any) => state.habits.habits[0];
export const selectHabits = (state: any) => state.habits.habits;
export const selectJournal = (state: any) => state.habits.journal;
