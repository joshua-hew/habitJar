import {
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfYear,
  endOfYear,
  compareAsc,
  endOfMonth,
  eachDayOfInterval,
  isSunday,
  startOfWeek,
  isFirstDayOfMonth,
  isSaturday,
  lastDayOfWeek,
  add,
} from "date-fns";

interface entry {
  date: string;
  done: number;
}
export const count_times_done_on_date = (history: entry[], date: Date) => {
  if (history.length == 0) return 0;

  for (let entry of history) {
    const entryDate = new Date(entry.date);
    if (isSameDay(entryDate, date)) {
      return entry.done;
    }
  }

  // If habit does not have an entry for that date
  return 0;
};

export const get_start_end_dates = (date: Date, timePeriod: string) => {
  let start_date: Date, end_date: Date;

  switch (timePeriod) {
    // Get Sunday and Saturday that contains the date
    case "Weekly":
      start_date = startOfWeek(date, { weekStartsOn: 0 });
      end_date = endOfWeek(date, { weekStartsOn: 0 });
      return [start_date, end_date];

    // Get first and last date in month that contains date
    case "Monthly":
      start_date = startOfMonth(date);
      end_date = endOfMonth(date);
      return [start_date, end_date];

    // Get first and last date of year that contains date
    case "Yearly":
      start_date = startOfYear(date);
      end_date = endOfYear(date);
      return [start_date, end_date];

    default:
      throw new Error(
        "Time period must be 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' "
      );
  }
};

export const count_times_done_during_interval = (
  history: entry[],
  start_date: Date,
  end_date: Date
) => {
  if (history.length == 0) return 0;

  let sum = 0;

  for (let entry of history) {
    const entry_date = new Date(entry.date);
    if (
      compareAsc(start_date, entry_date) <= 0 &&
      compareAsc(end_date, entry_date) >= 0
    ) {
      sum += entry.done;
    }
  }

  return sum;
};

interface goalHistoryEntry {
  startDate: string;
  endDate: string;
  goal: number;
}
export const get_goal_for_date = (
  goal_history: goalHistoryEntry[],
  date: Date
) => {
  // Out of bound date checks:
  // 1. What if date is before the start date of the first goal?
  const earliest_goal_start_date = new Date(goal_history[0].startDate);

  // compareAsc() doc:
  // Compare the two dates and return 1 if the first date is after the second,
  // -1 if the first date is before the second or 0 if dates are equal.
  if (compareAsc(date, earliest_goal_start_date) === -1)
    return goal_history[0].goal;

  for (let entry of goal_history) {
    const g_start_date = new Date(entry.startDate);
    let g_end_date;

    // The latest entry in goal history might not have end date.
    // End date only intitialized when the goal is edited in the Edit Habit screen
    if (entry.endDate === "") g_end_date = new Date();
    else g_end_date = new Date(entry.endDate);
    if (
      compareAsc(date, g_start_date) >= 0 &&
      compareAsc(date, g_end_date) <= 0
    ) {
      return entry.goal;
    }
  }
};

export const calculateHabitProgress = (habit: any, date: Date) => {
  const history = habit.history;
  const timePeriod = habit.timePeriod;
  let done_during_interval: number = 0;
  const goal: number = habit.goal;

  // Count the number of times the user did the habit for this time period
  if (timePeriod === "Daily") {
    done_during_interval = count_times_done_on_date(history, date);
  } else {
    const [start_date, end_date] = get_start_end_dates(date, timePeriod);
    done_during_interval = count_times_done_during_interval(
      history,
      start_date,
      end_date
    );
  }

  // Calculate the users progress for the this time period
  let progress: number = done_during_interval / goal;
  progress = progress * 100;
  if (progress > 100) progress = 100;
  return [progress, done_during_interval, goal];
};

export const getFirstLastCalendarDays = (month: number, year: number) => {
  let first, last;

  // First of month does not always start on Sunday. Get date of Sunday that potentially starts b4 month starts
  const firstDayOfMonth = new Date(year, month, 1);
  if (!isSunday(firstDayOfMonth)) {
    first = startOfWeek(firstDayOfMonth);
  } else {
    first = firstDayOfMonth;
  }

  // Add 5 weeks to first Saturday to get 6 weeks total
  const firstSat = lastDayOfWeek(first);
  last = add(firstSat, { weeks: 5 });

  return [first, last];
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
