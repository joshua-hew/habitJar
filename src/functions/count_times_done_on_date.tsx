import { activity_entry, segment } from "../interfaces/interfaces";
import { isBefore, isAfter, isEqual, isSameDay } from "date-fns";
import getIndexOfSegment from "../functions/getIndexOfSegment";

const count_times_done_on_date = (t: segment[], d: Date): number => {
  let done = 0;
  const index = getIndexOfSegment(t, d);

  if (index === -1) {
    // date is before earliest segment in timeline
    return 0;
  }

  // @ts-ignore
  for (let entry of t[index].activityLog) {
    if (isSameDay(d, new Date(entry.date))) {
      done += entry.done;
    }
  }

  return done;
};

export default count_times_done_on_date;
