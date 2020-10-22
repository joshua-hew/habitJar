import {
  count_times_done_on_date,
  get_start_end_dates,
  count_times_done_during_interval,
  calculateHabitProgress,
  get_goal_for_date,
} from "../components/HelperFunctions";

describe("testing count_times_done_on_date function", () => {
  const hello = "hello";

  it("should work", () => {
    expect(true).toBe(true);
  });
  /** 
  // Test Suite for get_count times done on date
  const today = new Date()
  const hist = [{
      date: today.toString(),
      done: 2
  }]
  
  // # 1
  res = count_times_done_on_date(hist, today)
  console.log(res) // should be 2
  
  // # 2 
  // History has no entry for yesterday. Should return 0
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  res = count_times_done_on_date(hist, yesterday)
  console.log(res)
  */
});

describe("Test suite for get_goal_for_date function", () => {
  const goal_history = [
    {
      startDate: "Tue Oct 11 2020 21:06:40 GMT-0400 (Eastern Daylight Time)",
      endDate: "Tue Oct 20 2020 21:06:40 GMT-0400 (Eastern Daylight Time)",
      goal: 1,
    },
    {
      startDate: "Tue Oct 20 2020 21:06:40 GMT-0400 (Eastern Daylight Time)",
      endDate: "",
      goal: 3,
    },
  ];

  it("should return the current goal when the date is today or later", () => {
    const today = new Date(
      "Tue Oct 20 2020 21:23:42 GMT-0400 (Eastern Daylight Time)"
    );
    const res = get_goal_for_date(goal_history, today);
    expect(res).toBe(3); // should be 3
  });

  it("should return an older goal when the date is before the start date of the current goal", () => {
    const date = new Date(
      "Tue Oct 19 2020 21:23:42 GMT-0400 (Eastern Daylight Time)"
    );
    const res = get_goal_for_date(goal_history, date);
    expect(res).toBe(1); // should be 1
  });

  it("should return the first goal when the date is before the start date of the first goal", () => {
    const date = new Date(
      "Tue Oct 1 2020 21:23:42 GMT-0400 (Eastern Daylight Time)"
    );
    const res = get_goal_for_date(goal_history, date);
    expect(res).toBe(1); // should be 1
  });
});
