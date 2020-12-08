import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectHabits,
  markComplete,
  markIncomplete,
  createTestHabit,
} from "../slices/habitSlice";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  Modal,
  TouchableHighlight,
} from "react-native";
import Navbar from "../components/Navbar";
import getDatesOfCurrentWeek from "../functions/getDatesOfCurrentWeek";
import count_times_done_on_date from "../functions/count_times_done_on_date";
import calculateCurrentStreak from "../functions/calcCurStreak";
import calculateCurrentProgress from "../functions/calcCurProgress";
import { isBefore } from "date-fns";

export const HomeScreen = (props: any) => {
  const habits = useSelector(selectHabits);
  const dispatch = useDispatch();
  //console.log("habits", habits);

  const myStyles = StyleSheet.create({
    openButton: {
      backgroundColor: "#2196F3",
      borderRadius: 20,
      padding: 10,
      marginTop: 20,
      elevation: 2,
    },
    demoButton: {
      backgroundColor: "#2196F3",
      borderRadius: 20,
      padding: 10,
      marginTop: 10,
      elevation: 2,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitleText}>Today</Text>
      </View>

      <FlatList
        data={habits}
        renderItem={({ item, index }) => (
          <Item habit={item} index={index} navigation={props.navigation} />
        )}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={ItemSeperator}
      />

      <TouchableHighlight
        style={myStyles.openButton}
        onPress={() => props.navigation.navigate("CreateHabit")}
      >
        <Text style={myStyles.textStyle}>New Habit</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={myStyles.demoButton}
        onPress={() => dispatch(createTestHabit())}
      >
        <Text style={myStyles.textStyle}>Create Demo Habits</Text>
      </TouchableHighlight>

      <Navbar navigation={props.navigation} />
    </View>
  );
};

const Item = (props: any) => {
  const habit = props.habit;
  const index = props.index;
  const navigation = props.navigation;

  const currentSegment = habit.timeline[habit.timeline.length - 1];
  const { name, description, goal, timePeriod, color } = currentSegment;

  const datesOfWeek: Date[] = getDatesOfCurrentWeek();
  const today = new Date();
  const doneToday =
    count_times_done_on_date(habit.timeline, today) > 0 ? true : false;

  const habitNameColor = doneToday ? color : "black";

  const currentStreak = calculateCurrentStreak(habit, new Date());
  //@ts-ignore
  const { done, remaining } = calculateCurrentProgress(habit);

  const ttpText = () => {
    if (timePeriod === "Daily") return "today";
    if (timePeriod === "Weekly") return "this week";
    if (timePeriod === "Monthly") return "this month";
    if (timePeriod === "Yearly") return "this year";
  };
  const thisTimePeriod = ttpText();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemHorizontalLeftSection}>
        {doneToday ? (
          <CheckMarkButton index={index} color={color} />
        ) : (
          <TodoButton index={index} color={color} />
        )}
      </View>

      <View style={styles.itemHorizontalMiddleAndRightContainer}>
        <TouchableOpacity
          style={styles.itemMiddleAndRightButtonStyle}
          onPress={() => {
            navigation.navigate("HabitStats", {
              habit,
              index,
              title: currentSegment.name,
            });
          }}
        >
          <View style={styles.itemHorizontalMiddleSection}>
            <View style={styles.itemHorizontalMiddleHabitNameContainer}>
              <Text style={{ ...styles.habitName, color: habitNameColor }}>
                {name}
              </Text>
            </View>
            <View
              style={styles.itemHorizontalMiddleWeeklyProgressSquaresContainer}
            >
              <DayProgressSquare
                habit={habit}
                date={datesOfWeek[0]}
                text={"S"}
              />
              <DayProgressSquare
                habit={habit}
                date={datesOfWeek[1]}
                text={"M"}
              />
              <DayProgressSquare
                habit={habit}
                date={datesOfWeek[2]}
                text={"T"}
              />
              <DayProgressSquare
                habit={habit}
                date={datesOfWeek[3]}
                text={"W"}
              />
              <DayProgressSquare
                habit={habit}
                date={datesOfWeek[4]}
                text={"TH"}
              />
              <DayProgressSquare
                habit={habit}
                date={datesOfWeek[5]}
                text={"F"}
              />
              <DayProgressSquare
                habit={habit}
                date={datesOfWeek[6]}
                text={"S"}
              />
            </View>
            <View style={styles.itemHorizontalMiddleProgressContainer}>
              <Text style={styles.progressText}>
                {done} / {goal} {thisTimePeriod}
              </Text>
            </View>
          </View>

          <View style={styles.itemHorizontalRightSection}>
            <Text style={{ ...styles.streakNumber, color: habitNameColor }}>
              {currentStreak}
            </Text>
            <Text style={{ ...styles.streakText, color: habitNameColor }}>
              {timePeriod.toUpperCase()} STREAK
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DayProgressSquare = (props: any) => {
  const habit = props.habit;
  const date = props.date;
  const text = props.text;
  const currentSegment = habit.timeline[habit.timeline.length - 1];
  const doneToday =
    count_times_done_on_date(habit.timeline, date) > 0 ? true : false;

  const setSquareColor = () => {
    if (doneToday) return currentSegment.color;
    else if (isBefore(date, new Date())) return "gray";
    else return "#dae4ee";
  };
  const squareColor = setSquareColor();

  const myStyles = StyleSheet.create({
    container: {
      backgroundColor: squareColor,
      justifyContent: "center",
      width: 18,
      height: 18,
      marginLeft: 5,
      marginRight: 5,
    },
    text: {
      color: "white",
      textAlign: "center",
      fontSize: 10,
    },
  });

  return (
    <View style={myStyles.container}>
      <Text style={myStyles.text}>{text}</Text>
    </View>
  );
};

const CheckMarkButton = (props: any) => {
  const color = props.color;

  const myStyles = StyleSheet.create({
    buttonStyle: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: color,
    },
    buttonInnerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyCircle: {
      borderRadius: 50,
      borderWidth: 4,
      borderColor: "white",
      backgroundColor: "white",
      width: 40,
      height: 40,
      marginBottom: 10,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    checkmarkIcon: {
      width: 30,
      height: 30,
      tintColor: color,
    },
    buttonText: {
      textAlign: "center",
      fontSize: 10,
      fontWeight: "bold",
      color: "white",
    },
  });

  const dispatch = useDispatch();
  const onPress = () => {
    const payload = {
      date: new Date().toString(),
      index: props.index,
    };
    dispatch(markIncomplete(payload));
  };

  return (
    <TouchableHighlight style={myStyles.buttonStyle} onPress={() => onPress()}>
      <View style={myStyles.buttonInnerContainer}>
        <View style={myStyles.emptyCircle}>
          <Image
            style={myStyles.checkmarkIcon}
            source={require("../../assets/checkmark.png")}
          />
        </View>
        <Text style={myStyles.buttonText}>DONE</Text>
      </View>
    </TouchableHighlight>
  );
};

const TodoButton = (props: any) => {
  const myStyles = StyleSheet.create({
    buttonStyle: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: "gray",
    },
    buttonInnerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyCircle: {
      borderRadius: 50,
      borderWidth: 4,
      borderColor: "white",
      width: 40,
      height: 40,
      marginBottom: 10,
    },
    buttonText: {
      textAlign: "center",
      fontSize: 10,
      fontWeight: "bold",
      color: "white",
    },
  });

  const dispatch = useDispatch();
  const onPress = () => {
    const payload = {
      date: new Date().toString(),
      index: props.index,
    };
    dispatch(markComplete(payload));
  };
  return (
    <TouchableHighlight style={myStyles.buttonStyle} onPress={() => onPress()}>
      <View style={myStyles.buttonInnerContainer}>
        <View style={myStyles.emptyCircle}></View>
        <Text style={myStyles.buttonText}>TODO</Text>
      </View>
    </TouchableHighlight>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 40,
    paddingBottom: 20,
  },
  screenTitleContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  screenTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  itemContainer: {
    backgroundColor: "white",
    //borderColor: "white",
    borderRadius: 10,
    //borderWidth: 5,
    height: 100,
    flexDirection: "row",
  },
  itemHorizontalLeftSection: {
    flex: 1,
  },
  itemIncrementButton: {
    flex: 1,
  },
  itemDecrementButton: {
    flex: 1,
  },
  itemLeftButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
  },
  itemHorizontalMiddleAndRightContainer: {
    flex: 3,
    //backgroundColor: "white",
    //borderRadius: 10,
  },
  itemMiddleAndRightButtonStyle: {
    flex: 1,
    flexDirection: "row",
  },
  itemHorizontalMiddleSection: {
    flex: 2,
    paddingHorizontal: 10,
    paddingTop: 5,
    justifyContent: "space-around",
  },
  itemHorizontalMiddleHabitNameContainer: {
    flex: 2.5,
  },
  itemHorizontalMiddleWeeklyProgressSquaresContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  itemHorizontalMiddleProgressContainer: {
    flex: 1,
    paddingLeft: 2,
    paddingTop: 2,
  },

  itemHorizontalRightSection: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  habitName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressText: {
    fontSize: 10,
    color: "gray",
  },
  streakNumber: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  streakText: {
    fontSize: 10,
    textAlign: "center",
    color: "gray",
  },
});

export default HomeScreen;
