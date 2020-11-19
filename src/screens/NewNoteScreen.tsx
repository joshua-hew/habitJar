import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectJournal, createJournalEntry } from "../slices/habitSlice";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Modal,
  TouchableHighlight,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { journalEntry } from "../interfaces/interfaces";

export const NewNoteScreen = (props: any) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const saveNewNote = () => {
    const payload: journalEntry = {
      title,
      body,
      dateCreated: new Date().toString(),
      lastModified: new Date().toString(),
    };
    dispatch(createJournalEntry(payload));
    props.navigation.navigate("Journal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleText}
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder={"Title"}
          multiline={true}
        />
      </View>

      <TextInput
        style={styles.bodyText}
        value={body}
        onChangeText={(text) => setBody(text)}
        placeholder={"Write your note here..."}
        multiline={true}
      />

      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            saveNewNote();
          }}
        >
          <Text style={styles.textStyle}>Save</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titleContainer: {
    paddingBottom: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 14,
  },
  openButton: {
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
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default NewNoteScreen;
