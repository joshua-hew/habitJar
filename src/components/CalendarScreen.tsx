import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectHabits,
  habitInterface,
  increment,
  decrement,
} from "../features/habitSlice";
import {
  calculateHabitProgress,
  getFirstLastCalendarDays,
  count_times_done_on_date,
} from "./HelperFunctions";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { NavigationContainer, useLinkProps } from "@react-navigation/native";
import {
  isSameDay,
  isToday,
  isTomorrow,
  isYesterday,
  getDay,
  getDate,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSunday,
  startOfWeek,
  isFirstDayOfMonth,
  isSaturday,
  lastDayOfWeek,
  intervalToDuration,
  isBefore,
  isAfter,
} from "date-fns";
import { eachWeekOfInterval } from "date-fns/esm";

interface HomeScreenProps {
  navigation: {};
  route: {};
}

export const CalendarScreen = (props: HomeScreenProps) => {
  const habits = useSelector(selectHabits);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const today = new Date();
  const [theFirst, setTheFirst]: [Date, any] = useState(startOfMonth(today)); // "first of current month"

  return (
    <View style={styles.container}>
      <Title />
      <HabitCalendarList habits={habits} theFirst={theFirst} />
    </View>
  );
};

const Title = () => {
  const thisStyles = StyleSheet.create({
    container: {
      marginLeft: 20,
      marginBottom: 30,
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 24,
      opacity: 0.9,
    },
  });
  return (
    <View style={thisStyles.container}>
      <Text style={thisStyles.titleText}>Monthly</Text>
    </View>
  );
};

const HabitCalendarList = (props: any) => {
  const habits = props.habits;
  const theFirst = props.theFirst;
  console.log(habits);

  const thisStyles = StyleSheet.create({
    habitListContainer: {
      //backgroundColor: "blue",
      flex: 1,
      //paddingBottom: 40,
      //marginBottom: 30,
    },
    contentContainer: {
      paddingTop: 50,
      paddingBottom: 100,
    },
  });

  return (
    <View style={thisStyles.habitListContainer}>
      <FlatList
        data={habits}
        renderItem={({ item }) => (
          <HabitCalendarCard habit={item} theFirst={theFirst} />
        )}
        contentContainerStyle={thisStyles.contentContainer}
      />
    </View>
  );
};

// Will reuse component in home screen.
const HabitCalendarCard = (props: any) => {
  const theFirst = props.theFirst; // Hopefully, this comp will re-render when "theFirst" is changed
  const habit = props.habit;

  const [curMonth, setCurMonth] = useState(theFirst); // sill the first of the month, not the month number
  const month = curMonth.getMonth();
  const year = curMonth.getFullYear();

  const today = new Date();
  let [firstCalendarDay, lastCalendarDay] = getFirstLastCalendarDays(
    month,
    year
  );

  const calendarDates: Date[] = eachDayOfInterval({
    start: firstCalendarDay,
    end: lastCalendarDay,
  });

  const weeks = [
    calendarDates.slice(0, 7),
    calendarDates.slice(7, 14),
    calendarDates.slice(14, 21),
    calendarDates.slice(21, 28),
    calendarDates.slice(28, 35),
    calendarDates.slice(35, 42),
  ];

  const rows = [
    <CalendarHeader key="header" curMonth={curMonth} habit={habit} />,
    <CalendarRow key="0" week={weeks[0]} habit={habit} />,
    <CalendarRow key="1" week={weeks[1]} habit={habit} />,
    <CalendarRow key="2" week={weeks[2]} habit={habit} />,
    <CalendarRow key="3" week={weeks[3]} habit={habit} />,
    <CalendarRow key="4" week={weeks[4]} habit={habit} />,
    <CalendarRow key="5" week={weeks[5]} habit={habit} />,
  ];

  // Gener//ate the data that will be passed to each day

  const thisStyles = StyleSheet.create({
    calCardContainer: {
      backgroundColor: "white",
      flex: 1,
      //height: 400,
      borderRadius: 5,
      //borderColor: "gray",
      //borderWidth: 1,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 20,
      shadowRadius: 9,
      shadowOpacity: 0.2,
    },
    habitName: {
      marginLeft: 5,
      marginBottom: 20,
      fontSize: 24,
      fontWeight: "bold",
    },
  });
  return (
    <View style={thisStyles.calCardContainer}>
      <Text style={thisStyles.habitName}>{habit.name}</Text>
      {rows}
    </View>
  );
};

const CalendarHeader = (props: any) => {
  const textColor = props.habit.habitColor;
  const curMonth = props.curMonth;
  const monthText = format(curMonth, "MMMM, yyyy");

  const thisStyles = StyleSheet.create({
    container: {
      //backgroundColor: "blue",
      flex: 1,
      marginBottom: 15,
    },
    monthContainer: {
      flex: 1,
      marginBottom: 10,
    },
    month: {
      //backgroundColor: "blue",
      textAlign: "center",
      color: textColor,
      fontWeight: "bold",
      fontSize: 16,
    },
    dayOfWeekContainer: {
      flex: 1,
      flexDirection: "row",
    },
    dayOfWeek: {
      flex: 1,
      textAlign: "center",
      color: textColor,
      fontWeight: "bold",
      fontSize: 16,
    },
  });
  return (
    <View style={thisStyles.container}>
      <View style={thisStyles.monthContainer}>
        <Text style={thisStyles.month}>{monthText}</Text>
      </View>
      <View style={thisStyles.dayOfWeekContainer}>
        <Text style={thisStyles.dayOfWeek}>Sun</Text>
        <Text style={thisStyles.dayOfWeek}>Mon</Text>
        <Text style={thisStyles.dayOfWeek}>Tue</Text>
        <Text style={thisStyles.dayOfWeek}>Wed</Text>
        <Text style={thisStyles.dayOfWeek}>Thu</Text>
        <Text style={thisStyles.dayOfWeek}>Fri</Text>
        <Text style={thisStyles.dayOfWeek}>Sat</Text>
      </View>
    </View>
  );
};

const CalendarRow = (props: any) => {
  const week = props.week;
  const habit = props.habit;
  const thisStyles = StyleSheet.create({
    container: {
      //backgroundColor: props.color,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
  return (
    <View style={thisStyles.container}>
      <CalendarCell date={week[0]} habit={habit} />
      <CalendarCell date={week[1]} habit={habit} />
      <CalendarCell date={week[2]} habit={habit} />
      <CalendarCell date={week[3]} habit={habit} />
      <CalendarCell date={week[4]} habit={habit} />
      <CalendarCell date={week[5]} habit={habit} />
      <CalendarCell date={week[6]} habit={habit} />
    </View>
  );
};

const CalendarCell = (props: any) => {
  const date = props.date;
  const habit = props.habit;
  const dateCreated = new Date(habit.dateCreated);
  const history = habit.history;
  const habitColor = habit.habitColor;
  const day = date.getDate();
  const done = count_times_done_on_date(history, date) > 0 ? true : false;
  const setTextColor = (date: Date, habitStartDate: Date) => {
    if (done) {
      return "white";
    } else if (
      (isBefore(date, habitStartDate) || isAfter(date, new Date())) &&
      !isSameDay(date, new Date())
    ) {
      return "gray";
    } else {
      return "black";
    }
  };
  const textColor = setTextColor(date, dateCreated);

  const thisStyles = StyleSheet.create({
    container: {
      //borderColor: "black",
      //borderWidth: 1,
      flex: 1,
      justifyContent: "center",
      height: 40,
    },
    innerContainer: {
      flex: 1,
      borderRadius: 5,
      backgroundColor: done ? habitColor : "transparent",
      justifyContent: "center",
      margin: 5,
    },
    day: {
      color: textColor,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  return (
    <View style={thisStyles.container}>
      <View style={thisStyles.innerContainer}>
        <Text style={thisStyles.day}>{day}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "green",
    backgroundColor: "#F5F5F5",
    flex: 1,
    opacity: 1,
    paddingTop: 30,
  },
});

export default CalendarScreen;

// helper functions
