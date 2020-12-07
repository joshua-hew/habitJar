import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectJournal } from "../slices/habitSlice";
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
import Navbar from "../components/Navbar";

export const JournalScreen = (props: any) => {
  const dispatch = useDispatch();
  const journal = useSelector(selectJournal);

  const sampleJournal = [
    {
      dateCreated: new Date().toString(),
      lastModified: new Date().toString(),
      title: "Sample Title",
      body: "Today I set a new record on my run.",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Journal</Text>
      </View>

      <FlatList
        style={styles.flatlist}
        data={journal}
        renderItem={({ item, index }) => (
          <Item
            journalEntry={item}
            index={index}
            navigation={props.navigation}
          />
        )}
        keyExtractor={(item) => item.dateCreated}
        ItemSeparatorComponent={ItemSeperator}
      />

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => props.navigation.navigate("New Note")}
      >
        <Text style={styles.textStyle}>New Note</Text>
      </TouchableHighlight>

      <Navbar navigation={props.navigation} />
    </View>
  );
};

const Item = (props: any) => {
  const journalEntry = props.journalEntry;
  const index = props.index;
  const navigation = props.navigation;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Edit Note", { journalEntry, index });
        }}
      >
        <View>
          <Text style={styles.itemTitle}>{journalEntry.title}</Text>
          <View style={styles.itemDateContainer}>
            <Text style={styles.itemDate}>
              {format(new Date(journalEntry.dateCreated), "MMMM do y EEE p")}
            </Text>
          </View>
          <Text>{journalEntry.body}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ItemSeperator = (props: any) => {
  return <View style={styles.itemSeperator}></View>;
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
  screenTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  flatlist: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  itemTitle: {
    //fontWeight: "bold",
    fontSize: 20,
  },
  itemDateContainer: {
    marginBottom: 20,
  },
  itemDate: {
    fontWeight: "100",
    //fontSize: 10,
  },
  itemBody: {},
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
  itemSeperator: {
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
    marginTop: 7,
    marginBottom: 7,
  },
});

export default JournalScreen;
