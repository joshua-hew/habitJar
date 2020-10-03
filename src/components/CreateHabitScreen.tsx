import React, { Component, useState } from "react";
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

export const CreateHabitScreen = () => {
  return (
    <KeyboardAwareScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Header />
        <HabitForm />
      </View>
    </KeyboardAwareScrollView>
  );
};
/**
 * <Button
          title="Save"
          onPress={() => {
            console.log("Save button pressed!");
          }}
        />
 * 
 * 
 */
const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Create a Habit</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HabitForm = () => {
  const [name, onChangeName] = React.useState("");

  return (
    <View style={styles.formContainer}>
      <Text style={styles.nameTitle}>Name</Text>
      <TextInput
        style={styles.nameField}
        placeholder={"Exercise, Quit Pressing Snooze"}
        onChangeText={(text) => onChangeName(text)}
        value={name}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
    opacity: 0.9,
    alignSelf: "flex-end",
  },
  buttonsContainer: {
    //backgroundColor: "purple",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  cancelButton: {
    backgroundColor: "#E6E6E6",
    width: 50,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: 10,
  },
  cancelText: {
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#E6E6E6",
    width: 50,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: 10,
  },
  saveText: {
    fontSize: 14,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
  },
  nameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    opacity: 0.9,
  },
  nameField: {
    width: 221,
    height: 27,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
});

export default CreateHabitScreen;
