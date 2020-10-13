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
import {getTodaysDate} from "./HelperFunctions"

interface HomeScreenProps {
  navigation: {};
  route: {};
}

export const HomeScreen = (props: HomeScreenProps) => {
  const habits = useSelector(selectHabits);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const today = new Date()
  const [curSelectedDate, setCurSelectedDate] = useState(today);
  //console.log(curSelectedDate)

  // TODO: finish design of calendarBar + functionality
  // TODO: Change basic text -> unordered list of habits
  // TODO: change logic in caclulateProgress() to get the day of the current view
  // TODO: implement increment function
  
  // Design: keep history as entries / snapshots that record certain bits of info about the state of the habit like done and goal (at the time of recording)

  return (
    <View style={styles.container}>
      <Title />
      <GrayBar />
      <CalendarBar curSelectedDate={curSelectedDate} setCurSelectedDate={setCurSelectedDate}/>
      <HabitList habits={habits}/>
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

const CalendarBar = (props: any) => {
  const curSelectedDate = props.curSelectedDate;
  const setCurSelectedDate = props.setCurSelectedDate;
  const leftArrow = "<"
  const rightArrow = ">"
  const dayNumber = curSelectedDate.getDate()

  const decrementDay = () => {
    let nextDay = new Date(curSelectedDate.getTime()-1000*60*60*24)
    setCurSelectedDate(nextDay)
  }
  const incrementDay = () => {
    let nextDay = new Date(curSelectedDate.getTime()+1000*60*60*24)
    setCurSelectedDate(nextDay)
    
  }
  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.calendarText}>TODAY</Text>
      <View style={styles.calendarDays}>
        <TouchableOpacity onPress={decrementDay}>
          <Text>{leftArrow}</Text>
        </TouchableOpacity>
        <Text>{dayNumber - 2}</Text>
        <Text>{dayNumber - 1}</Text>
        <Text>{dayNumber}</Text>
        <Text>{dayNumber + 1}</Text>
        <Text>{dayNumber + 2}</Text>
        <TouchableOpacity onPress={incrementDay}>
          <Text>{rightArrow}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * [
          {
            key: "Exercise",
            color: "#FA8072",
            goal: 1,
            history: { "9-23-2020": { done: 1 } },
          },
          {
            key: "Study",
            color: "blue",
            goal: 1,
            history: { "9-23-2020": { done: 0 } },
          },
          {
            key: "Meditate",
            color: "#50E3C2",
            goal: 2,
            history: { "9-23-2020": { done: 1 } },
          },
        ] 
 */

const HabitList = (props: any) => {
  const habits = props.habits;
  console.log(`habits: ${habits}`)
  return (
    <View style={styles.habitListContainer}>
      <FlatList
        contentContainerStyle={styles.testContainer}
        data={habits}
        renderItem={({ item }) => <HabitCard habit={item} />}
      />
    </View>
  );
};

interface habitCardProps {
  habit: habitInterface;
}

const MockHabitCard = (props: any) => {
  const h = props.habit
  
  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}

const HabitCard = (props: any) => {
  const h = props.habit;
  const today_string = getTodaysDate()
  
  const calculateProgress = (habit: any, date: string) => {    
    // If habit doesn't have an entry for that date
    if (date in habit.history === false) {
      return 0
    }

    let progress: number = habit.history[date].done / habit.history[date].goal;
    progress = progress * 100;
    console.log(`progress: ${progress}`);
    return progress;
  };
  const progress = calculateProgress(h, today_string);

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
      backgroundColor: h.habitColor,
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
    //backgroundColor: "green",
    backgroundColor: "white",
    flex: 1,
    opacity: 1,
    paddingTop: 60, // TODO: change to 30
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
    //backgroundColor: "blue",
    flex: 1,
  },
  testContainer: {
    //backgroundColor: "purple",
    flex: 1,
  },
});

export default HomeScreen;

// helper functions
