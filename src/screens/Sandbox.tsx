import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectHabits,
  increment,
  decrement,
  createTestHabit,
} from "../slices/habitSlice";
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
} from "date-fns";

const SandboxScreen = (props: any) => {
  const today = new Date();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Sandbox</Text>
      <TouchableOpacity onPress={() => dispatch(createTestHabit())}>
        <Text>Create test habit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(increment(today.toString()))}>
        <Text>Increment habit for {today.toString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate("Calendar")}>
        <Text>CalendarScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { SandboxScreen };
