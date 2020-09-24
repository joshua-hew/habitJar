import React, { Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHabits, habitInterface } from "../features/habitSlice";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from "react-native";

export const HomePage = () => {
  const habits = useSelector(selectHabits);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  // TODO: finish design of calendarBar + functionality
  // TODO: Change basic text -> unordered list of habits

  return (
    <View style={styles.container}>
      <Title />
      <GrayBar />
      <CalendarBar />
      <HabitList />
    </View>
  );
};

const Title = () => {
  return (
    <View>
      <Text style={styles.titleText}>Y.A.H.A</Text>
    </View>
  );
};

const GrayBar = () => {
  return <View style={styles.grayBar}></View>;
};

const CalendarBar = () => {
  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.calendarText}>TODAY</Text>
      <View style={styles.calendarDays}>
        <Text>5</Text>
        <Text>6</Text>
        <Text>7</Text>
        <Text>8</Text>
        <Text>9</Text>
      </View>
    </View>
  );
};

const HabitList = () => {
  return (
    <View style={styles.habitListContainer}>
      <FlatList
        style={styles.flatListContainer}
        data={[
          { key: "Exercise", history: { "9-23-2020": { goal: 1, done: 1 } } },
          { key: "Study", history: { "9-23-2020": { goal: 1, done: 0 } } },
          { key: "Meditate", history: { "9-23-2020": { goal: 2, done: 1 } } },
        ]}
        renderItem={({ item }) => <HabitCard habit={item} />}
      />
    </View>
  );
};

interface habitCardProps {
  habit: habitInterface;
}

const HabitCard = (props: habitCardProps) => {
  const h = props.habit;
  return (
    <View>
      <Text>{h.key}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    opacity: 1,
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    opacity: 0.9,
  },
  grayBar: {
    height: 8,
    backgroundColor: "#D7CDCD",
    opacity: 0.27,
    marginTop: 10,
  },
  calendarContainer: {
    backgroundColor: "#fff",
    marginTop: 25,
  },
  calendarText: {
    fontWeight: "bold",
    fontSize: 14,
    opacity: 0.9,
    textAlign: "center",
  },
  calendarDays: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    opacity: 0.9,
  },
  habitListContainer: {
    backgroundColor: "blue",
  },
  flatListContainer: {
    backgroundColor: "purple",
  },
});

export default HomePage;

// helper functions
