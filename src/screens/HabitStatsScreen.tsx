import { useLinkProps } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHabit, editHabit, deleteHabit } from "../slices/habitSlice";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { format, sub, eachDayOfInterval } from "date-fns";
import count_times_done_on_date from "../functions/count_times_done_on_date";
import calculateCurrentStreak from "../functions/calcCurStreak";
import { segment } from "../interfaces/interfaces";

export const HabitStatsScreen = (props: any) => {
  const habit = props.route.params.habit;
  const index = props.route.params.index;
  const curSeg = habit.timeline[habit.timeline.length - 1];

  const today = new Date();
  const _365daysAgo = sub(today, { days: 365 });
  const dates: Date[] = eachDayOfInterval({
    start: _365daysAgo,
    end: today,
  });

  const dayArray: any = [];
  dates.forEach((value, index) => {
    dayArray.push(<DaySquare key={index} date={value} habit={habit} />);
  });

  const segmentArray: any[] = [];
  const timeline: segment[] = habit.timeline;
  //timeline.forEach((value, index) => {
  //  <Segment key={index} segment={value} />;
  //});

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.reminderButton}
            onPress={() => {
              console.log("oops");
            }}
          >
            <Image
              style={styles.reminderIcon}
              source={require("../../assets/bell.png")}
            />
            <Text style={styles.reminderButtonText}> Reminders </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              props.navigation.navigate("EditHabit", { habit, index });
            }}
          >
            <Image
              style={styles.gearIcon}
              source={require("../../assets/gear.png")}
            />
            <Text style={styles.reminderButtonText}> Edit </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Basic Stats</Text>
        <View style={styles.basicStatsContainer}>
          <Text style={styles.statName}>Current Streak</Text>
          <Text style={styles.statData}>
            {calculateCurrentStreak(habit, today)}
          </Text>
          <Text style={styles.statName}>Total Days Done</Text>
          <Text style={styles.statData}>stuff</Text>
          <Text style={styles.statName}>Goal</Text>
          <Text style={styles.statData}>{curSeg.goal}</Text>
          <Text style={styles.statName}>Time Period</Text>
          <Text style={styles.statData}>{curSeg.timePeriod}</Text>
          <Text style={styles.statName}>Start Date</Text>
          <Text style={styles.statData}>
            {format(new Date(habit.dateCreated), "MMM dd yyyy")}
          </Text>
        </View>

        <Text style={styles.title}>Last 365 Days</Text>
        <View style={styles.last365DaysContainer}>{dayArray}</View>

        <Text style={styles.title}>Habit Timeline</Text>
        <View style={styles.habitTimelineContainer}>
          <FlatList
            data={timeline}
            renderItem={({ item, index }) => <Segment segment={item} />}
            keyExtractor={(item) => item.startDate}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const Segment = (props: any) => {
  const segment = props.segment;

  const startDateString = format(new Date(segment.startDate), "MMM dd yyyy");
  const endDateString =
    segment.endDate === undefined
      ? "ongoing"
      : format(new Date(segment.endDate), "MMM dd yyyy");

  const myStyles = StyleSheet.create({
    container: {
      backgroundColor: "white",
    },
    leftText: {
      width: "60%",
      fontSize: 12,
      fontWeight: "bold",
    },
    rightText: {
      width: "40%",
      fontSize: 12,
      color: "gray",
      marginBottom: 5,
    },
  });

  return (
    <View style={myStyles.container}>
      <Text style={myStyles.leftText}>Start Date</Text>
      <Text style={myStyles.rightText}>{startDateString}</Text>
      <Text style={myStyles.leftText}>End Date</Text>
      <Text style={myStyles.rightText}>{endDateString}</Text>
      <Text style={myStyles.leftText}>Name</Text>
      <Text style={myStyles.rightText}>{segment.name}</Text>
      <Text style={myStyles.leftText}>Description</Text>
      <Text style={myStyles.rightText}>{segment.description}</Text>
      <Text style={myStyles.leftText}>Goal</Text>
      <Text style={myStyles.rightText}>{segment.goal}</Text>
      <Text style={myStyles.leftText}>Time Period</Text>
      <Text style={myStyles.rightText}>{segment.timePeriod}</Text>
      <Text style={myStyles.leftText}>color</Text>
      <Text style={myStyles.rightText}>{segment.color}</Text>
      <Text style={myStyles.leftText}>Total Days Done</Text>
      <Text style={myStyles.rightText}>{segment.activityLog.length}</Text>
    </View>
  );
};

const DaySquare = (props: any) => {
  const date = props.date;
  const habit = props.habit;
  const index = Number(habit.key);

  const done =
    count_times_done_on_date(habit.timeline, date) > 0 ? true : false;

  const myStyles = StyleSheet.create({
    container: {
      width: 15,
      height: 15,
      backgroundColor: done ? "rgb(137, 196, 244)" : "rgba(137, 196, 244, 0.3)",
      margin: 1,
    },
  });
  return <View style={myStyles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    //paddingTop: 40,
    paddingBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 40,
    marginBottom: 20,
  },
  reminderButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 45,
    marginRight: 10,
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 45,
    marginLeft: 10,
  },
  reminderIcon: {
    width: 35,
    height: 35,
  },
  gearIcon: {
    width: 30,
    height: 30,
  },
  reminderButtonText: {
    fontSize: 16,
    color: "rgba(65, 131, 215, 1)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  basicStatsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  statName: {
    width: "40%",
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  statData: {
    width: "60%",
    fontSize: 12,
    fontWeight: "bold",
  },
  last365DaysContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  habitTimelineContainer: {
    //flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
});

export default HabitStatsScreen;
