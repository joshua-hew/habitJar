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

export const CreateHabitScreen = (props: any) => {
  // Redux methods
  const habits = useSelector(selectHabits);
  const dispatch = useDispatch();

  // Form state
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [timePeriod, setTimePeriod] = React.useState("Daily");
  const [goal, setGoal] = React.useState(0);
  const [days, setDays] = React.useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [habitColor, setHabitColor] = React.useState("#D0021B");
  const [reminders, setReminders] = React.useState("");
  const [msg, onChangeMsg] = React.useState("");

  // Errors (track if input to fields are invalid)
  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");

  const data = {
    name: name,
    description: description,
    timePeriod: timePeriod,
    goal: goal,
    days: days,
    habitColor: habitColor,
    reminders: reminders,
    msg: msg,
  };

  const onSubmit = (formData: any) => {
    console.log(formData);

    // Basic form validation

    // Dispatch to store
    //dispatch(createHabit(formData));

    // Test code
    const testFormData = {
      name: "Exercises",
      goal: 3,
      habitColor: "#D0021B",
      timePeriod: "Weekly"
    }
    dispatch(createHabit(testFormData))
  };

/**
 * <TrackHabitOn days={days} setDays={setDays} />
 * <TimePeriod timePeriod={timePeriod} setTimePeriod={setTimePeriod} />
 * 
 */

  return (
    <KeyboardAwareScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Header
          preLoadedOnSubmit={() => onSubmit(data)}
          navigation={props.navigation}
        />
        <Name name={name} setName={setName} nameError={nameError} setNameError={setNameError}/>
        <Description description={description} setDescription={setDescription} descriptionError={descriptionError} setDescriptionError={setDescriptionError}/>        
        <Goal goal={goal} setGoal={setGoal} timePeriod={timePeriod} setTimePeriod={setTimePeriod}/>        
        <HabitColor habitColor={habitColor} setHabitColor={setHabitColor} />
        <Reminders />
        <MotivationalMsg msg={msg} onChangeMsg={onChangeMsg} />
      </View>
    </KeyboardAwareScrollView>
  );
};

//Big Difference:
// onPress={myFunc()} myFunc is triggered on every render.
// onPress={() => myFunc()} usefule technique for preloading function b4 passing it down as a prop.

const Header = (props: any) => {
  const preLoadedOnSubmit = props.preLoadedOnSubmit;
  const formData = props.formData;

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Create a Habit</Text>

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
  const nameErrorExists: boolean = nameError !== ""
  const charLimit = 2
  
  const onChangeText = (text: string) => {
    // if user input is too long, do not update name field.
    if (text.length > charLimit) {
      setNameError(`Must be less than ${charLimit} characters`)
    }
    
    // if the input text, clear the name error (if exists) and update name field
    else {
      if(nameErrorExists) setNameError("")
      setName(text)
    }
  }

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Name</Text>
      <TextInput
        style={styles.nameField}
        placeholder={"Exercise, Quit Pressing Snooze"}
        onChangeText={(text) => onChangeText(text)}
        value={name}
      ></TextInput>
      <View>{nameErrorExists ? <Text>{nameError}</Text> : null}</View>
    </View>
  
  );
};

const Description = (props: any) => {
  const description = props.description;
  const setDescription = props.setDescription;
  const descriptionError = props.descriptionError;
  const setDescriptionError = props.setDescriptionError;
  const descriptionErrorExists: boolean = descriptionError !== ""
  const charLimit = 2

  const onChangeText = (text: string) => {
    // if user input is too long, do not updatefield.
    if (text.length > charLimit) {
      setDescriptionError(`Must be less than ${charLimit} characters`)
    }
    
    // if the input text is valid, clear the error (if exists) and update field
    else {
      if(descriptionErrorExists) setDescriptionError("")
      setDescription(text)
    }
  }

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Description</Text>
      <TextInput
          style={styles.descriptionField}
          onChangeText={(text) => onChangeText(text)}
          value={description}
          multiline={true}
        >        
        </TextInput>
        <View>{descriptionErrorExists ? <Text>{descriptionError}</Text> : null}</View>
    </View>
  )
}

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
  setTimePeriod(value: string): void;
}

const Goal = (props: goalProps) => {
  const goal = props.goal;
  const string_goal = goal === 0 ? "" : goal.toString();
  const setGoal = props.setGoal;
  const timePeriod = props.timePeriod;
  const setTimePeriod = props.setTimePeriod
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
      console.log("whoops");
    } else {
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
    </View>
  );
};

/**
 * <Picker
          selectedValue={timePeriod}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) => {setTimePeriod(itemValue.toString())}}
        >
          <Picker.Item label="Day" value="Daily"/>
          <Picker.Item label="Week" value="Weekly"/>
          <Picker.Item label="Month" value="Monthly"/>
          <Picker.Item label="Year" value="Yearly"/>
        </Picker>
 */

interface trackHabitOnProps {
  days: {};
  setDays(value: {}): void;
}

const TrackHabitOn = (props: trackHabitOnProps) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Track Habit on:</Text>
      <View style={styles.dayCheckBoxContainer}>
        <DayCheckBox {...props} text="Monday" />
        <DayCheckBox {...props} text="Tuesday" />
        <DayCheckBox {...props} text="Wednesday" />
        <DayCheckBox {...props} text="Thursday" />
        <DayCheckBox {...props} text="Friday" />
        <DayCheckBox {...props} text="Saturday" />
        <DayCheckBox {...props} text="Sunday" />
      </View>
    </View>
  );
};

// TODO: making a interface for these props is difficult
const DayCheckBox = (props: any) => {
  const days = props.days;
  const setDays = props.setDays;
  const text = props.text;
  const isMonday = text === "Monday";
  let isSelected = days[text];

  const onPress = () => {
    days[text] = !days[text];
    setDays({
      ...days,
      text: !days[text],
    });
  };

  const dcbStyles = StyleSheet.create({
    row: {
      //backgroundColor: "blue",
      flexDirection: "row",
      marginTop: isMonday ? 0 : 20,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 5,
      backgroundColor: isSelected ? "black" : "#E6E6E6",
      marginRight: 10,
    },
  });

  return (
    <View style={dcbStyles.row}>
      <TouchableOpacity
        style={dcbStyles.checkbox}
        onPress={onPress}
      ></TouchableOpacity>
      <Text>{text}</Text>
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

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>Motivational Message</Text>
      <View>
        <TextInput
          style={styles.motivationalMsgField}
          onChangeText={(text) => onChangeMsg(text)}
          value={msg}
          multiline={true}
        ></TextInput>
      </View>
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
});

export default CreateHabitScreen;
