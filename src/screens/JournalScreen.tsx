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

export const JournalScreen = (props: any) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Journal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  testButton: {
    margin: 10,
  },
});

export default JournalScreen;
