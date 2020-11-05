import _ from "lodash";
import { activity_entry, segment } from "../interfaces/interfaces";
import { isBefore, isAfter, isEqual, isSameDay } from "date-fns";
import getIndexOfSegment from "../functions/getIndexOfSegment";

const removeActivityEntry = (t: segment[], d: Date) => {
  let timeline: segment[] = _.cloneDeep(t);
  const index = getIndexOfSegment(t, d);
  if (index === -1) {
    // date is before earliest segment in timeline
    return timeline;
  }

  // @ts-ignore
  for (let j = 0; j < timeline[index].activityLog.length; j++) {
    // @ts-ignore
    const entry = timeline[index].activityLog[j];
    if (isSameDay(d, new Date(entry.date))) {
      // @ts-ignore
      timeline[index].activityLog.splice(j, 1);
      break;
    }
  }

  return timeline;
};

export default removeActivityEntry;
