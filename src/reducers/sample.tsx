import { HABIT_CREATION_SUCCESS } from "../actions/";

let cloneObject = function (obj: any) {
  return JSON.parse(JSON.stringify(obj));
};
