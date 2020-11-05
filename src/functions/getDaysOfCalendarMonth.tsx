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

const getDaysOfCalendarMonth = (month: number, year: number) => {
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

  const calendarDates: Date[] = eachDayOfInterval({
    start: first,
    end: last,
  });

  return calendarDates;
};

export default getDaysOfCalendarMonth;
