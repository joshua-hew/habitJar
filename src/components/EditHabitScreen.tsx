import { useLinkProps } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHabits, habitInterface } from "../slices/habitSlice";
import { editHabit, deleteHabit } from "../slices/habitSlice";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import store from "../store/store";

export const EditHabitScreen = (props: any) => {
  const { habit } = props.route.params;
  const habitIndex = habit.key;

  // Redux methods
  const habits = useSelector(selectHabits);
  const dispatch = useDispatch();

  // Form state
  const [name, setName] = React.useState(habit.name);
  const [description, setDescription] = React.useState(habit.description);
  const [timePeriod, setTimePeriod] = React.useState(habit.timePeriod);
  const [goal, setGoal] = React.useState(habit.goal);
  const [habitColor, setHabitColor] = React.useState(habit.habitColor);
  const [reminders, setReminders] = React.useState("");
  const [msg, onChangeMsg] = React.useState(habit.msg);

  // Errors (will be populated when invalid input is discovered)
  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [goalError, setGoalError] = React.useState("");
  const [msgError, setMsgError] = React.useState("");

  const data = {
    // TODO: add reminders
    name,
    description,
    timePeriod,
    goal,
    habitColor,
    msg,
    habitIndex,
  };

  const errors = {
    nameError,
    descriptionError,
    goalError,
    msgError,
  };

  const onSubmit = (formData: any, formErrors: any) => {
    // Todo: error msg for missing mandatory field
    console.log(formData);

    // Basic form validation
    // 1. Check for empty fields
    const optionalFields = ["description", "msg"];
    for (const [key, value] of Object.entries(formData)) {
      if (optionalFields.includes(key)) continue;
      if (value === "" || value === 0) {
        console.log(`Cannot save habit. ${key} is empty.`);
        return;
      }
    }

    // 2. Check if any error msgs
    for (const [key, value] of Object.entries(formErrors)) {
      if (value !== "") {
        console.log(`Cannot save habit. ${key}: ${value}`);
        return;
      }
    }

    // Dispatch to store
    dispatch(editHabit(formData));
  };

  return (
    <KeyboardAwareScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Header
          preLoadedOnSubmit={() => onSubmit(data, errors)}
          navigation={props.navigation}
        />
        <Name
          name={name}
          setName={setName}
          nameError={nameError}
          setNameError={setNameError}
        />
        <Description
          description={description}
          setDescription={setDescription}
          descriptionError={descriptionError}
          setDescriptionError={setDescriptionError}
        />
        <TimePeriod timePeriod={timePeriod} setTimePeriod={setTimePeriod} />
        <Goal
          goal={goal}
          setGoal={setGoal}
          timePeriod={timePeriod}
          goalError={goalError}
          setGoalError={setGoalError}
        />
        <HabitColor habitColor={habitColor} setHabitColor={setHabitColor} />
        <Reminders />
        <MotivationalMsg
          msg={msg}
          onChangeMsg={onChangeMsg}
          msgError={msgError}
          setMsgError={setMsgError}
        />
        <Footer habitIndex={habitIndex} navigation={props.navigation} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const Header = (props: any) => {
  const preLoadedOnSubmit = props.preLoadedOnSubmit;
  const formData = props.formData;

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Edit Habit</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={preLoadedOnSubmit}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Name = (props: any) => {
  const name = props.name;
  const setName = props.setName;
  const nameError = props.nameError;
  const setNameError = props.setNameError;
  const nameErrorExists: boolean = nameError !== "";
  const charLimit = 30;

  const onChangeText = (text: string) => {
    // if user input is too long, do not update name field.
    if (text.length > charLimit) {
      setNameError(`Name cannot exceed ${charLimit} characters`);
    }

    // if the input text, clear the name error (if exists) and update name field
    else {
      if (nameErrorExists) setNameError("");
      setName(text);
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Name</Text>
      <TextInput
        style={styles.nameField}
        placeholder={"Exercise, Quit Pressing Snooze"}
        onChangeText={(text) => onChangeText(text)}
        value={name}
      ></TextInput>
      <View>
        {nameErrorExists ? (
          <Text style={styles.errorText}>{nameError}</Text>
        ) : null}
      </View>
    </View>
  );
};

const Description = (props: any) => {
  const description = props.description;
  const setDescription = props.setDescription;
  const descriptionError = props.descriptionError;
  const setDescriptionError = props.setDescriptionError;
  const descriptionErrorExists: boolean = descriptionError !== "";
  const charLimit = 200;

  const onChangeText = (text: string) => {
    // if user input is too long, do not updatefield.
    if (text.length > charLimit) {
      setDescriptionError(`Description cannot exceed ${charLimit} characters`);
    }

    // if the input text is valid, clear the error (if exists) and update field
    else {
      if (descriptionErrorExists) setDescriptionError("");
      setDescription(text);
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Description</Text>
      <TextInput
        style={styles.descriptionField}
        onChangeText={(text) => onChangeText(text)}
        value={description}
        multiline={true}
      ></TextInput>
      <View>
        {descriptionErrorExists ? (
          <Text style={styles.errorText}>{descriptionError}</Text>
        ) : null}
      </View>
    </View>
  );
};

interface timePeriodProps {
  timePeriod: string;
  setTimePeriod(value: any): void;
}

const TimePeriod = (props: timePeriodProps) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Time Period</Text>
      <View style={styles.timePeriodsRow}>
        <TPButton {...props} text="Daily" />
        <TPButton {...props} text="Weekly" />
        <TPButton {...props} text="Monthly" />
        <TPButton {...props} text="Yearly" />
      </View>
    </View>
  );
};

interface tpButtonProps {
  timePeriod: string;
  setTimePeriod(value: any): void;
  text: string;
}
const TPButton = (props: tpButtonProps) => {
  const timePeriod = props.timePeriod;
  const setTimePeriod = props.setTimePeriod;
  const text = props.text;
  const isDaily = text === "Daily";
  const isSelected = timePeriod === text;

  //console.log(`timePeriod: ${timePeriod}`);

  const onPress = () => setTimePeriod(text);

  const tpButtonStyles = StyleSheet.create({
    timePeriodButton: {
      marginLeft: isDaily ? 0 : 15,
      width: 57,
      height: 25,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isSelected ? "#E6E6E6" : "#FFFFFF",
      borderWidth: isSelected ? 2 : 0,
    },
    timePeriodButtonText: {
      opacity: 0.9,
      fontSize: 14,
    },
  });

  return (
    <TouchableOpacity style={tpButtonStyles.timePeriodButton} onPress={onPress}>
      <Text style={tpButtonStyles.timePeriodButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

interface goalProps {
  goal: number;
  setGoal(value: number): void;
  timePeriod: string;
  goalError: string;
  setGoalError(value: string): void;
}

const Goal = (props: goalProps) => {
  const goal = props.goal;
  const string_goal = goal === 0 ? "" : goal.toString();
  const setGoal = props.setGoal;
  const timePeriod = props.timePeriod;
  const goalError = props.goalError;
  const setGoalError = props.setGoalError;
  const goalErrorExists: boolean = goalError !== "";
  let per = "";

  switch (timePeriod) {
    case "Daily":
      per = "Day";
      break;
    case "Weekly":
      per = "Week";
      break;
    case "Monthly":
      per = "Month";
      break;
    case "Yearly":
      per = "Year";
      break;
  }

  const onChangeGoalText = (text: string) => {
    let num = Number(text);

    if (isNaN(num)) {
      setGoalError("Goal must be a number");
    } else if (num > 100) {
      setGoalError("Goal cannot be greater than 100");
    } else {
      if (goalErrorExists) setGoalError("");
      setGoal(num);
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Goal</Text>
      <View style={styles.goalRow}>
        <TextInput
          style={styles.goalField}
          onChangeText={(text) => onChangeGoalText(text)}
          value={string_goal}
        ></TextInput>
        <Text style={styles.per}> times </Text>
        <Text style={styles.slash}>/</Text>
        <Text style={styles.per}>{per}</Text>
      </View>
      <View>
        {goalErrorExists ? (
          <Text style={styles.errorText}>{goalError}</Text>
        ) : null}
      </View>
    </View>
  );
};

interface habitColorProps {
  habitColor: string;
  setHabitColor(value: string): void;
}

const HabitColor = (props: habitColorProps) => {
  const colors: string[] = [
    "#D0021B",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#FF4500",
    "#2102D0",
    "#FFA500",
    "#FF6347",
    "#FF69B4",
    "#C71585",
    "#FAEBD7",
    "#FA8072",
    "#808000",
  ];
  const colorSquares = [];

  for (let index in colors) {
    let color = colors[index];
    colorSquares.push(<ColorSquare {...props} color={color} key={index} />);
  }

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Habit Color:</Text>
      <View style={styles.colorContainer}>{colorSquares}</View>
    </View>
  );
};

interface colorSquareProps {
  color: string;
  habitColor: string;
  setHabitColor(value: string): void;
}

const ColorSquare = (props: colorSquareProps) => {
  const color = props.color;
  const habitColor = props.habitColor;
  const setHabitColor = props.setHabitColor;
  const isSelected = color === habitColor;

  const onPress = () => {
    setHabitColor(color);
  };

  const csStyles = StyleSheet.create({
    colorSquare: {
      width: 30,
      height: 30,
      borderRadius: 30,
      backgroundColor: color,
      borderWidth: isSelected ? 4 : 0,
      marginTop: 20,
      marginLeft: 15,
    },
  });

  return (
    <View>
      <TouchableOpacity
        style={csStyles.colorSquare}
        onPress={onPress}
      ></TouchableOpacity>
    </View>
  );
};

const Reminders = (props: any) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Reminders</Text>
      <View>
        <Text>None</Text>
      </View>
    </View>
  );
};

const MotivationalMsg = (props: any) => {
  const msg = props.msg;
  const onChangeMsg = props.onChangeMsg;
  const msgError = props.msgError;
  const setMsgError = props.setMsgError;
  const msgErrorExists: boolean = msgError !== "";
  const charLimit = 200;

  const onChangeText = (text: string) => {
    // if user input is too long, do not updatefield.
    if (text.length > charLimit) {
      setMsgError(`Motivational Message cannot exceed ${charLimit} characters`);
    }

    // if the input text is valid, clear the error (if exists) and update field
    else {
      if (msgErrorExists) setMsgError("");
      onChangeMsg(text);
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Motivational Message</Text>
      <View>
        <TextInput
          style={styles.motivationalMsgField}
          onChangeText={(text) => onChangeText(text)}
          value={msg}
          multiline={true}
        ></TextInput>
      </View>
      <View>
        {msgErrorExists ? (
          <Text style={styles.errorText}>{msgError}</Text>
        ) : null}
      </View>
    </View>
  );
};

const Footer = (props: any) => {
  const habitIndex = props.habitIndex;
  const dispatch = useDispatch();

  const onConfirmDeletePress = () => {
    dispatch(deleteHabit(habitIndex));
    props.navigation.navigate("Home");
  };

  const confirmDeleteAlert = (habitIndex: string) => {
    Alert.alert("Confirm Delete?", undefined, [
      { text: "Delete", onPress: onConfirmDeletePress },
      {
        text: "Cancel",
        onPress: () => console.log("cancelled"),
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDeleteAlert(habitIndex)}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
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
    paddingBottom: 100,
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
  fieldContainer: {
    flex: 1,
    marginTop: 40,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: "bold",
    opacity: 0.9,
  },
  nameField: {
    width: 221,
    height: 27,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  descriptionField: {
    width: 250,
    height: 110,
    backgroundColor: "#E6E6E6",
    textAlignVertical: "top",
    marginTop: 20,
    padding: 5,
    borderRadius: 5,
  },
  timePeriodsRow: {
    //backgroundColor: "green",
    flexDirection: "row",
    marginTop: 20,
  },
  goalRow: {
    //backgroundColor: "green",
    flexDirection: "row",
  },
  goalField: {
    width: 75,
    height: 27,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  slash: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20,
    marginTop: 10,
  },
  per: {
    opacity: 0.9,
    marginLeft: 20,
    marginTop: 25,
  },
  dayCheckBoxContainer: {
    //backgroundColor: "green",
    //flexWrap: "wrap",
    //maxHeight: 200,
    marginTop: 30,
  },
  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  motivationalMsgField: {
    width: 250,
    height: 110,
    backgroundColor: "#E6E6E6",
    textAlignVertical: "top",
    marginTop: 20,
    padding: 5,
    borderRadius: 5,
  },
  footerContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    width: 55,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: 10,
  },
  errorText: {
    color: "red",
  },
});

export default EditHabitScreen;
