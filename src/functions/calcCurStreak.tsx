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

const calculateCurrentStreak = (habit: habit, lastDayOfStreak: Date) => {
  const curSegment = habit.timeline[habit.timeline.length - 1];
  const { goal, timePeriod, activityLog } = curSegment;
  const startDate = new Date(curSegment.startDate);

  // daily
  if (timePeriod === "Daily") {
    let date = lastDayOfStreak;
    let streak = 0;
    streak += count_times_done_on_date(habit.timeline, date); // today being incomplete should not break streak
    date = sub(date, { days: 1 });

    while (isAfter(date, startDate) || isSameDay(date, startDate)) {
      const timesDone = count_times_done_on_date(habit.timeline, date);
      if (timesDone === 0) break;
      else {
        streak += timesDone;
        date = sub(date, { days: 1 });
      }
    }
    return streak;
  }

  // weekly
  else if (timePeriod === "Weekly") {
    let date = lastDayOfStreak;
    let sow = startOfWeek(date);
    let eow = endOfWeek(date);
    let streak = 0;

    // current week is special. should not break streak if incomplete
    let week: Date[] = eachDayOfInterval({
      start: sow,
      end: eow,
    });
    let counter = 0;
    week.forEach((d) => {
      if (isAfter(d, startDate) || isSameDay(d, startDate)) {
        counter += count_times_done_on_date(habit.timeline, d);
      }
    });
    if (counter >= goal) streak += 1;
    date = sub(date, { weeks: 1 });
    sow = startOfWeek(date);
    eow = endOfWeek(date);

    while (isAfter(eow, startDate) || isSameDay(eow, startDate)) {
      week = eachDayOfInterval({
        start: sow,
        end: eow,
      });
      counter = 0;
      week.forEach((element) => {
        if (isAfter(element, startDate) || isSameDay(element, startDate)) {
          counter += count_times_done_on_date(habit.timeline, element);
        }
      });
      if (counter >= goal) streak += 1;
      else break;

      date = sub(date, { weeks: 1 });
      sow = startOfWeek(date);
      eow = endOfWeek(date);
    }
    return streak;
  }

  // monthly
  else if (timePeriod === "Monthly") {
    let date = lastDayOfStreak;
    let som = startOfMonth(date);
    let eom = endOfMonth(date);
    let streak = 0;

    // current month is special. should not break streak if incomplete
    let month: Date[] = eachDayOfInterval({
      start: som,
      end: eom,
    });
    let counter = 0;
    month.forEach((d) => {
      if (isAfter(d, startDate) || isSameDay(d, startDate)) {
        counter += count_times_done_on_date(habit.timeline, d);
      }
    });
    if (counter >= goal) streak += 1;
    date = sub(date, { months: 1 });
    som = startOfMonth(date);
    eom = endOfMonth(date);

    // previous months
    while (isAfter(eom, startDate) || isSameDay(eom, startDate)) {
      month = eachDayOfInterval({
        start: som,
        end: eom,
      });
      counter = 0;
      month.forEach((element) => {
        if (isAfter(element, startDate) || isSameDay(element, startDate)) {
          counter += count_times_done_on_date(habit.timeline, element);
        }
      });
      if (counter >= goal) streak += 1;
      else break;

      date = sub(date, { months: 1 });
      som = startOfMonth(date);
      eom = endOfMonth(date);
    }
    return streak;
  }

  // yearly
  else if (timePeriod === "Yearly") {
    let date = lastDayOfStreak;
    let soy = startOfYear(date);
    let eoy = endOfYear(date);
    let streak = 0;

    // current year is special. should not break streak if incomplete
    let year: Date[] = eachDayOfInterval({
      start: soy,
      end: eoy,
    });
    let counter = 0;
    year.forEach((d) => {
      if (isAfter(d, startDate) || isSameDay(d, startDate)) {
        counter += count_times_done_on_date(habit.timeline, d);
      }
    });
    if (counter >= goal) streak += 1;
    date = sub(date, { years: 1 });
    soy = startOfYear(date);
    eoy = endOfYear(date);

    // previous months
    while (isAfter(eoy, startDate) || isSameDay(eoy, startDate)) {
      year = eachDayOfInterval({
        start: soy,
        end: eoy,
      });
      counter = 0;
      year.forEach((element) => {
        if (isAfter(element, startDate) || isSameDay(element, startDate)) {
          counter += count_times_done_on_date(habit.timeline, element);
        }
      });
      if (counter >= goal) streak += 1;
      else break;

      date = sub(date, { months: 1 });
      soy = startOfYear(date);
      eoy = endOfYear(date);
    }
    return streak;
  }
};

export default calculateCurrentStreak;
