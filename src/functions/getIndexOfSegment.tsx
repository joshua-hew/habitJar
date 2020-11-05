import { activity_entry, segment } from "../interfaces/interfaces";
import {
  isBefore,
  sub,
  startOfDay,
  endOfDay,
  isAfter,
  isEqual,
  isSameDay,
} from "date-fns";

const getIndexOfSegment = (t: segment[], d: Date) => {
  let index;
  const last = t.length - 1;
  if (isBefore(d, new Date(t[0].startDate))) index = -1;
  // d occurs b4 earliest segment
  else if (
    isSameDay(d, new Date(t[last].startDate)) ||
    isAfter(d, new Date(t[last].startDate))
  )
    index = last;
  // d occurs during present segment
  else {
    for (let i = 0; i < last; i++) {
      const beg = new Date(t[i].startDate); //@ts-ignore
      const end = new Date(t[i].endDate);
      if (
        (isSameDay(d, beg) || isAfter(d, beg)) && // isEqual is inconsistent, especially for endDate, and timezone switch
        (isSameDay(d, end) || isBefore(d, end))
      ) {
        index = i;
      }
    }
  }
  return index;
};

export default getIndexOfSegment;
