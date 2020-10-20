import { useLinkProps } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHabits, habitInterface } from "../features/habitSlice";
import { createHabit } from "../features/habitSlice";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import store from "../store/store";

export const EditHabitScreen = (props: any) => {
    return (
        <View>
            <Text>Hello There</Text>
        </View>
    )
}

export default EditHabitScreen;