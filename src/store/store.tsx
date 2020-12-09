import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import habitReducer from "../slices/habitSlice";

import { AsyncStorage } from "react-native";
import { testJournal } from "../functions/testJournal";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers } from "redux";
/** 
export default configureStore({
  reducer: {
    counter: counterReducer,
    habits: habitReducer,
  },
});
*/

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const reducers = combineReducers({
  counter: counterReducer,
  habits: habitReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

let persistor = persistStore(store);

export { store, persistor };
