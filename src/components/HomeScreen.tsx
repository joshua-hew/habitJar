import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHabits, habitInterface, increment, decrement } from "../features/habitSlice";
import { calculateHabitProgress } from "../features/habitSlice";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { NavigationContainer, useLinkProps } from "@react-navigation/native";
import {getTodaysDate, dateToString} from "./HelperFunctions"
import { isSameDay, isToday, isTomorrow, isYesterday, getDay, getDate, format } from "date-fns";

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
  //console.log("curSelectedDate:", curSelectedDate)

  // TODO: finish design of calendarBar + functionality
  // TODO: Change basic text -> unordered list of habits
  // TODO: change logic in caclulateProgress() to get the day of the current view
  // TODO: implement increment function
  
  // Design: keep history as entries / snapshots that record certain bits of info about the state of the habit like done and goal (at the time of recording)

  return (
    <View style={styles.container}>
      <Title />
      <GrayBar />
      <CalendarBar today={today} curSelectedDate={curSelectedDate} setCurSelectedDate={setCurSelectedDate}/>
      <HabitList habits={habits} curSelectedDate={curSelectedDate} navigation={props.navigation}/>
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
  const today = props.today
  const curSelectedDate = props.curSelectedDate;
  const setCurSelectedDate = props.setCurSelectedDate;
  const leftArrow = "<"
  const rightArrow = ">"
  const dayNumber = curSelectedDate.getDate()
  
  const displayDateText = (today: Date, curSelectedDate: Date) => {
    // Today
    if(isSameDay(today, curSelectedDate)) return "TODAY"

    // Tomorrow
    else if(isTomorrow(curSelectedDate)) return "TOMORROW"

    // Yesterday
    else if(isYesterday(curSelectedDate)) return "YESTERDAY"

    else {
      return format(curSelectedDate, "E, MMM do")
    }
  }
  const dateText = displayDateText(today, curSelectedDate)

  const decrementDay = () => {
    let prevDay = new Date(curSelectedDate.getTime()-1000*60*60*24)
    setCurSelectedDate(prevDay)
  }
  const incrementDay = () => {
    let nextDay = new Date(curSelectedDate.getTime()+1000*60*60*24)
    setCurSelectedDate(nextDay)
    
  }
  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.calendarText}>{dateText}</Text>
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
  const curSelectedDate = props.curSelectedDate
  const navigation = props.navigation
  console.log(habits)
  //console.log("HabitList cur date:", curSelectedDate)
  return (
    <View style={styles.habitListContainer}>
      <FlatList
        contentContainerStyle={styles.testContainer}
        data={habits}
        renderItem={({ item }) => <HabitCard habit={item} curSelectedDate={curSelectedDate} navigation={navigation}/>}
        extraData={curSelectedDate} //This is to ensure that the HabitCard updates everytime curSelectedDate changes
      />
    </View>
  );
};

interface habitCardProps {
  habit: habitInterface;
}

const MockHabitCard = (props: any) => {
  const h = props.habit;
  const dispatch = useDispatch();
  const curSelectedDate = props.curSelectedDate
  const [progress, done, goal] = calculateHabitProgress(h, curSelectedDate);
  
  const incrementHabitCount = (h: any, date: Date) => {
    //console.log("increment. date is:", date)
    const payload: any = {}
    payload.habitIndex = h.key
    payload.targetDate = date.toString()  // actions should accept serializable values
    dispatch(increment(payload))
  };

  const decrementHabitCount = (h: any, date: Date) => {
    const payload: any = {}
    payload.habitIndex = h.key
    payload.targetDate = date.toString()  // actions should accept serializable values
    dispatch(decrement(payload))
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
    <View>
      <TouchableOpacity
        style={cardStyles.habitCardContainer}
        onPress={() => incrementHabitCount(h, curSelectedDate)}
      >
        <View style={cardStyles.progressBar}></View>
        <Text style={cardStyles.habitName}>{h.name}</Text>
        <Text style={cardStyles.progressCounter}>{done} / {goal}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => decrementHabitCount(h, curSelectedDate)}>
      <Text>Decrement</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const HabitCard = (props: any) => {
  const h = props.habit;
  const dispatch = useDispatch();
  const curSelectedDate = props.curSelectedDate
  const [progress, done, goal] = calculateHabitProgress(h, curSelectedDate);
  
  const incrementHabitCount = (h: any, date: Date) => {
    //console.log("increment. date is:", date)
    const payload: any = {}
    payload.habitIndex = h.key
    payload.targetDate = date.toString()  // actions should accept serializable values
    dispatch(increment(payload))
  };

  const decrementHabitCount = (h: any, date: Date) => {
    const payload: any = {}
    payload.habitIndex = h.key
    payload.targetDate = date.toString()  // actions should accept serializable values
    dispatch(decrement(payload))
  };

  const cardStyles = StyleSheet.create({
    habitCardContainer: {
      flexDirection: "row",
      minHeight: 83,
      marginLeft: "5%",
      marginRight: "5%",
      marginTop: 30,
      borderRadius: 15,
      backgroundColor: "#E6E6E6",
    },
    habitNameContainer: {
      flex: 3,
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
      //backgroundColor: "blue",
      //flex: 3,
      marginTop: "9%",
      marginLeft: "10%",
      fontWeight: "bold",
      fontSize: 18,
      opacity: 0.9,
    },
    progressCounterContainer: {
      //backgroundColor: "green",
      flex: 1,
      paddingTop: "5%",
      paddingLeft: "10%",
    },
    progressCounter: {
      fontWeight: "bold",
      fontSize: 18,
      opacity: 0.9,
    },
  });

  return (
    <View>
      <View style={cardStyles.habitCardContainer}>
      <View style={cardStyles.progressBar}></View>
        
        <TouchableOpacity style={cardStyles.habitNameContainer} onPress={() => props.navigation.navigate("EditHabit", h)}>
          <Text style={cardStyles.habitName}>{h.name}</Text>
        </TouchableOpacity>
        
      
        
        <View style={cardStyles.progressCounterContainer}>
          <TouchableOpacity onPress={() => incrementHabitCount(h, curSelectedDate)}>
            <Text>UP</Text>
          </TouchableOpacity>
          <Text style={cardStyles.progressCounter}>{done} / {goal}</Text>
          <TouchableOpacity onPress={() => decrementHabitCount(h, curSelectedDate)}>
            <Text>DOWN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
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
