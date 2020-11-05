import { activity_entry, segment } from "../interfaces/interfaces";
import { isBefore, isAfter, isEqual, isSameDay } from "date-fns";
import getIndexOfSegment from "../functions/getIndexOfSegment";

const getActivityEntries = (t: segment[], d: Date) => {
  let activityEntries = [];

  const index = getIndexOfSegment(t, d);
  if (index === -1) {
    // date is before earliest segment in timeline
    return [];
  }

  // @ts-ignore
  for (let entry of t[index].activityLog) {
    if (isSameDay(d, new Date(entry.date))) {
      activityEntries.push(entry);
    }
  }

  return activityEntries;
};

export default getActivityEntries;
