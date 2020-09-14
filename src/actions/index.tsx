export const HABIT_CREATION_SUCCESS = "HABIT_CREATION_SUCCESS";
export const HABIT_CREATION_ERROR = "HABIT_CREATION_ERROR";

export function create_habit(habitName: string) {
  if (habitName.length < 50) {
    return {
      type: HABIT_CREATION_SUCCESS,
    };
  } else {
    return {
      type: HABIT_CREATION_ERROR,
    };
  }
}

const person = {
  first: name,
};
