import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import habitReducer from "../slices/habitSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    habits: habitReducer,
  },
});
