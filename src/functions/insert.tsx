import { activity_entry, segment } from "../interfaces/interfaces";
import _ from "lodash";
import {
  isBefore,
  sub,
  startOfDay,
  endOfDay,
  isAfter,
  isEqual,
  isSameDay,
} from "date-fns";
import getIndexOfSegment from "../functions/getIndexOfSegment";

export const compareActivityEntries = (
  a: activity_entry,
  b: activity_entry
) => {
  const aDate = new Date(a.date);
  const bDate = new Date(b.date);
  if (isBefore(aDate, bDate)) return -1;
  if (isBefore(bDate, aDate)) return 1;
  return 0;
};

export const insert = (t: segment[], d: Date): segment[] => {
  let timeline: segment[] = _.cloneDeep(t);

  const index = getIndexOfSegment(t, d);

  if (index === -1) {
    // create new segment
    const new_seg: segment = {
      startDate: startOfDay(d).toString(),
      endDate: endOfDay(sub(new Date(t[0].startDate), { days: 1 })).toString(),
      name: t[0].name,
      description: t[0].description,
      goal: t[0].goal,
      timePeriod: t[0].timePeriod,
      color: t[0].color,
      activityLog: [
        {
          date: d.toString(),
          done: 1,
        },
      ],
    };
    // insert segment at beginning of timeline
    timeline.splice(0, 0, new_seg);
  }

  // insert into correct segment and sort if necessary
  else {
    //@ts-ignore
    if (timeline[index].activityLog.length === 0) {
      //@ts-ignore
      timeline[index].activityLog = [{ date: d.toString(), done: 1 }];
    } else {
      //@ts-ignore
      timeline[index].activityLog = [
        //@ts-ignore
        ...timeline[index].activityLog,
        { date: d.toString(), done: 1 },
      ]; //@ts-ignore
      timeline[index].activityLog.sort(compareActivityEntries);
    }
  }

  return timeline;
};
