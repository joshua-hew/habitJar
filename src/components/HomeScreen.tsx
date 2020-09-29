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
import { increment } from "../features/counterSlice";
import { NavigationContainer, useLinkProps } from "@react-navigation/native";

interface HomeScreenProps {
  navigation: {};
  route: {};
}

export const HomeScreen = (props: HomeScreenProps) => {
  const habits = useSelector(selectHabits);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  console.log(props);

  // TODO: finish design of calendarBar + functionality
  // TODO: Change basic text -> unordered list of habits
  // TODO: change logic in caclulateProgress() to get the day of the current view
  // TODO: implement increment function

  return (
    <View style={styles.container}>
      <Title />
      <GrayBar />
      <CalendarBar />
      <HabitList />
      <CreateHabitButton navigation={props.navigation} />
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
        contentContainerStyle={styles.testContainer}
        data={[
          {
            key: "Exercise",
            color: "#FA8072",
            history: { "9-23-2020": { goal: 1, done: 1 } },
          },
          {
            key: "Study",
            color: "blue",
            history: { "9-23-2020": { goal: 1, done: 0 } },
          },
          {
            key: "Meditate",
            color: "#50E3C2",
            history: { "9-23-2020": { goal: 2, done: 1 } },
          },
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
  const calculateProgress = () => {
    let day = "9-23-2020";
    let progress: number = h.history[day].done / h.history[day].goal;
    progress = progress * 100;
    console.log(`progress: ${progress}`);
    return progress;
  };
  const progress = calculateProgress();

  const increment = () => {
    console.log("incrementing habit count");
  };

  const cardStyles = StyleSheet.create({
    habitCardContainer: {
      minHeight: 83,
      marginLeft: "5%",
      marginRight: "5%",
      marginTop: 30,
      borderRadius: 15,
      backgroundColor: "#E6E6E6",
    },
    progressBar: {
      position: "absolute",
      height: "100%",
      width: `${progress}%`,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      borderTopRightRadius: progress === 100 ? 15 : 0,
      borderBottomRightRadius: progress === 100 ? 15 : 0,
      backgroundColor: h.color,
    },

    habitName: {
      position: "absolute",
      marginTop: "9%",
      marginLeft: "10%",
      fontWeight: "bold",
      fontSize: 18,
      opacity: 0.9,
    },

    progressCounter: {
      position: "relative",
      marginTop: "9%",
      marginLeft: "75%",
      fontWeight: "bold",
      fontSize: 18,
      opacity: 0.9,
    },
  });

  return (
    <TouchableOpacity
      style={cardStyles.habitCardContainer}
      onPress={() => increment()}
    >
      <View style={cardStyles.progressBar}></View>
      <Text style={cardStyles.habitName}>{h.key}</Text>
      <Text style={cardStyles.progressCounter}>0 / 0</Text>
    </TouchableOpacity>
  );
};

interface CreateHabitButtonProps {
  navigation: any;
}

const CreateHabitButton = (props: CreateHabitButtonProps) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate("CreateHabit")}>
      <Text>+</Text>
    </TouchableOpacity>
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
    marginBottom: 25,
    paddingBottom: 25,
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
    flex: 1,
  },
  testContainer: {
    backgroundColor: "purple",
    flex: 1,
  },
});

export default HomeScreen;

// helper functions
