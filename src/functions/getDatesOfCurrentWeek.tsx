import { endOfWeek, eachDayOfInterval, startOfWeek } from "date-fns";

const getDatesOfCurrentWeek = () => {
  const today = new Date();
  const dates: Date[] = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });

  return dates;
};

export default getDatesOfCurrentWeek;
