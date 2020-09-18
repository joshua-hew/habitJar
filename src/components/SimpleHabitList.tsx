import React, { Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeHabit, selectHabit } from "../features/habitSlice";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

export const SimpleHabitList = () => {
  const habit = useSelector(selectHabit);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  // TODO: Change basic text -> unordered list of habits

  return (
    <View style={styles.container}>
      <Text>Habits:</Text>
      <Text>{habit}</Text>
      <TextInput
        value={text}
        placeholder="Enter Habit Name..."
        onChangeText={(input) => {
          setText(input);
        }}
      />
      <button aria-label="Submit" onClick={() => dispatch(changeHabit(text))}>
        Submit
      </button>

      <button
        style={{ height: 100 }}
        aria-label="Debug"
        onClick={() => console.log(habit)}
      >
        Debug
      </button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
