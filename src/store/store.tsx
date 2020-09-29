import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import habitReducer from "../features/habitSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    habits: habitReducer,
  },
});
