import { activity_entry, segment, habit } from "../interfaces/interfaces";
import {
  isBefore,
  isAfter,
  isEqual,
  isSameDay,
  sub,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import count_times_done_on_date from "./count_times_done_on_date";

const calculateCurrentProgress = (habit: habit) => {
  const curSegment = habit.timeline[habit.timeline.length - 1];
  const { goal, timePeriod, activityLog } = curSegment;
  const startDate = new Date(curSegment.startDate);

  const today = new Date();

  if (timePeriod === "Daily") {
    let done = count_times_done_on_date(habit.timeline, today);
    let remaining = goal - done;
    return { done, remaining };
  } else if (timePeriod === "Weekly") {
    let done = 0;
    let remaining = 0;
    const week = eachDayOfInterval({
      start: startOfWeek(today),
      end: endOfWeek(today),
    });
    week.forEach((day) => {
      if (isAfter(day, startDate) || isSameDay(day, startDate)) {
        done += count_times_done_on_date(habit.timeline, day);
      }
    });
    remaining = goal - done;
    return { done, remaining };
  } else if (timePeriod === "Monthly") {
    let done = 0;
    let remaining = 0;
    const month = eachDayOfInterval({
      start: startOfMonth(today),
      end: endOfMonth(today),
    });
    month.forEach((day) => {
      if (isAfter(day, startDate) || isSameDay(day, startDate)) {
        done += count_times_done_on_date(habit.timeline, day);
      }
    });
    remaining = goal - done;
    return { done, remaining };
  } else if (timePeriod === "Yearly") {
    let done = 0;
    let remaining = 0;
    const year = eachDayOfInterval({
      start: startOfYear(today),
      end: endOfYear(today),
    });
    year.forEach((day) => {
      if (isAfter(day, startDate) || isSameDay(day, startDate)) {
        done += count_times_done_on_date(habit.timeline, day);
      }
    });
    remaining = goal - done;
    return { done, remaining };
  }
};

export default calculateCurrentProgress;
