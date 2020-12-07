import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectHabits,
  markComplete,
  markIncomplete,
} from "../slices/habitSlice";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  Alert,
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
import Navbar from "../components/Navbar";
import getDaysOfCalendarMonth from "../functions/getDaysOfCalendarMonth";
import getActivityEntries from "../functions/getActivityEntries";
import count_times_done_on_date from "../functions/count_times_done_on_date";
import hexToRGB from "../functions/hexToRGB";

const CalendarScreen = (props: any) => {
  const habits = useSelector(selectHabits);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitleText}>Calendar</Text>
      </View>

      <FlatList
        data={habits}
        renderItem={({ item, index }) => (
          <CalendarMonth habit={item} index={index} />
        )}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={ItemSeperator}
      />
      <Navbar navigation={props.navigation} />
    </View>
  );
};

const ItemSeperator = (props: any) => {
  const myStyles = StyleSheet.create({
    itemSeperator: {
      marginTop: 7,
      marginBottom: 7,
    },
  });
  return <View style={myStyles.itemSeperator}></View>;
};

const CalendarMonth = (props: any) => {
  const habit = props.habit;
  const [cmDate, setcmDate] = useState(new Date());
  const year = cmDate.getFullYear();
  const month = cmDate.getMonth();
  const today = new Date();

  const calendarDates: Date[] = getDaysOfCalendarMonth(month, year);
  const weeks = [
    calendarDates.slice(0, 7),
    calendarDates.slice(7, 14),
    calendarDates.slice(14, 21),
    calendarDates.slice(21, 28),
    calendarDates.slice(28, 35),
    calendarDates.slice(35, 42),
  ];

  const rows = [
    <CalendarHeader key="header" month={month} year={year} habit={habit} />,
    <CalendarWeek key="0" week={weeks[0]} habit={habit} />,
    <CalendarWeek key="1" week={weeks[1]} habit={habit} />,
    <CalendarWeek key="2" week={weeks[2]} habit={habit} />,
    <CalendarWeek key="3" week={weeks[3]} habit={habit} />,
    <CalendarWeek key="4" week={weeks[4]} habit={habit} />,
    <CalendarWeek key="5" week={weeks[5]} habit={habit} />,
  ];
  const thisStyles = StyleSheet.create({
    container: {
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
  return <View style={thisStyles.container}>{rows}</View>;
};

const CalendarHeader = (props: any) => {
  const month = props.month;
  const year = props.year;
  const habit = props.habit;
  const date = new Date(year, month);
  const textColor = "#add8e6";
  const headerText = format(date, "MMMM yyyy");
  const name = habit.timeline[habit.timeline.length - 1].name;

  const thisStyles = StyleSheet.create({
    container: {
      //backgroundColor: "blue",
      flex: 1,
      marginBottom: 15,
    },
    habitName: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 25,
      textAlign: "center",
    },
    monthTextContainer: {
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
      <Text style={thisStyles.habitName}>{name}</Text>
      <View style={thisStyles.monthTextContainer}>
        <Text style={thisStyles.month}>{headerText}</Text>
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

const CalendarWeek = (props: any) => {
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
      <CalendarDay date={week[0]} habit={habit} />
      <CalendarDay date={week[1]} habit={habit} />
      <CalendarDay date={week[2]} habit={habit} />
      <CalendarDay date={week[3]} habit={habit} />
      <CalendarDay date={week[4]} habit={habit} />
      <CalendarDay date={week[5]} habit={habit} />
      <CalendarDay date={week[6]} habit={habit} />
    </View>
  );
};

const CalendarDay = (props: any) => {
  const date = props.date;
  const habit = props.habit;
  const index = Number(habit.key); // temporary solution. supposed to be passed as prop
  const timeline = habit.timeline;
  const habitColor = habit.timeline[habit.timeline.length - 1].color;
  const day = date.getDate();
  //const activityEntries = getActivityEntries(timeline, date); // important

  const doneToday =
    count_times_done_on_date(habit.timeline, date) > 0 ? true : false;

  // modal for inserting coins
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const onPressTodo = (date: Date) => {
    const payload = { date: date.toString(), index: index };
    dispatch(markComplete(payload));
  };

  const onPressDone = (date: Date) => {
    const payload = { date: date.toString(), index: index };
    dispatch(markIncomplete(payload));
  };

  const determineTextColor = () => {
    if (isBefore(date, startOfMonth(new Date()))) return "gray";
    if (isAfter(date, new Date())) return "gray";
    if (doneToday) return "white";
    return "black";
  };
  const textColor = determineTextColor();

  const determineBackgroundColor = () => {
    if (!doneToday) return "transparent";
    if (isBefore(date, startOfMonth(new Date())) && doneToday)
      return hexToRGB(habitColor, 0.5);
    if (isAfter(date, new Date()) && doneToday)
      return hexToRGB(habitColor, 0.5);
    if (doneToday) return habitColor;
  };

  const thisStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      height: 40,
    },
    innerContainer: {
      flex: 1,
      borderRadius: 5,
      borderColor: "black",
      borderWidth: isSameDay(date, new Date()) ? 3 : 0,
      backgroundColor: determineBackgroundColor(),
      justifyContent: "center",
      margin: 5,
    },
    day: {
      color: textColor,
      //fontWeight: "bold",
      textAlign: "center",
    },
  });

  return (
    <View style={thisStyles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{format(date, "EEE, MMM do")}</Text>
            <Text>{doneToday ? 1 : 0}</Text>

            {doneToday ? (
              <TouchableHighlight
                style={styles.markIncompleteButton}
                onPress={() => {
                  onPressDone(date);
                }}
              >
                <Text style={styles.textStyle}>Mark Incomplete</Text>
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                style={styles.markCompleteButton}
                onPress={() => {
                  onPressTodo(date);
                }}
              >
                <Text style={styles.textStyle}>Mark Complete</Text>
              </TouchableHighlight>
            )}

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <View style={thisStyles.innerContainer}>
        <TouchableHighlight onPress={() => setModalVisible(true)}>
          <Text style={thisStyles.day}>{day}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "green",
    //backgroundColor: "#add8e6",
    flex: 1,
    opacity: 1,
    paddingTop: 30,
    paddingBottom: 20,
  },

  container2: {
    backgroundColor: "#D3D3D3",
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  screenTitleContainer: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  screenTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  centeredView: {
    // the full screen-ish container that contains the modal
    //backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  markCompleteButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  markIncompleteButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CalendarScreen;
