import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import store from "./src/store/store";
import { Provider } from "react-redux";
import { SimpleHabitList } from "./src/components/SimpleHabitList";
import { Counter } from "./src/components/Counter";

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Counter />
        <SimpleHabitList />
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
