// Main Habit Data

export interface habit {
  dateCreated: string; // should be beginning of day (ex: Mon Nov 02 2020 00:00:00 GMT-0500 (Eastern Standard Time))
  timeline: segment[];
}

export interface segment {
  startDate: string; // should be beginning of day (ex: Mon Nov 02 2020 00:00:00 GMT-0500 (Eastern Standard Time))
  endDate: string | undefined; // should be end of day (ex: Mon Nov 02 2020 23:59:59.999 GMT-0500 (Eastern Standard Time))
  name: string;
  description: string;
  goal: number; // range: [0, 100]
  timePeriod: string; // "Daily", "Weekly", "Monthly", "Yearly"
  color: string;
  activityLog: activity_entry[] | [];
}

export interface activity_entry {
  date: string;
  done: number; // range: [0, goal]
}
// test that "edit" on same day does not set end date to endOfYesterday

export interface journalEntry {
  title: string;
  body: string;
  dateCreated: string;
  lastModified: string;
}
