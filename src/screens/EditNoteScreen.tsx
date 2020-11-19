import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectJournal,
  editJournalEntry,
  deleteJournalEntry,
} from "../slices/habitSlice";
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

export const EditNoteScreen = (props: any) => {
  const journalEntry = props.route.params.journalEntry;
  const index = props.route.params.index;
  const [title, setTitle] = useState(journalEntry.title);
  const [body, setBody] = useState(journalEntry.body);
  const dispatch = useDispatch();

  const saveEditsToNote = () => {
    const editedNote: journalEntry = {
      title,
      body,
      dateCreated: journalEntry.dateCreated,
      lastModified: new Date().toString(),
    };
    const payload = { editedNote, index };
    dispatch(editJournalEntry(payload));
    props.navigation.navigate("Journal");
  };

  const deleteNote = () => {
    dispatch(deleteJournalEntry(index));
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
            saveEditsToNote();
          }}
        >
          <Text style={styles.textStyle}>Save</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#ffcccb" }}
          onPress={() => {
            deleteNote();
          }}
        >
          <Text style={styles.textStyle}>Delete</Text>
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

export default EditNoteScreen;
