import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore } from "redux";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import SimpleCounter from "./src/components/SimpleCounter";

const initialState = {
  counter: 40,
};

const reducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case "INCREASE_COUNTER":
      return { counter: state.counter + 1 };
    case "DECREASE_COUNTER":
      return { counter: state.counter - 1 };
  }

  return state;
};

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SimpleCounter />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
