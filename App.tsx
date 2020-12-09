import "react-native-gesture-handler"; // MUST BE AT TOP
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
//import store from "./src/store/store";
import { store, persistor } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import CalendarScreen from "./src/screens/CalendarScreen";
import CreateHabitScreen from "./src/screens/CreateHabitScreen";
import EditHabitScreen from "./src/screens/EditHabitScreen";
import JournalScreen from "./src/screens/JournalScreen";
import NewNoteScreen from "./src/screens/NewNoteScreen";
import EditNoteScreen from "./src/screens/EditNoteScreen";
import HomeScreen from "./src/screens/HomeScreen";
import HabitStatsScreen from "./src/screens/HabitStatsScreen";
import { SandboxScreen } from "./src/screens/Sandbox";

const Stack = createStackNavigator();
//<PersistGate loading={null} persistor={persistor}>
//</PersistGate>
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Sandbox"
              component={SandboxScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="HabitStats"
              component={HabitStatsScreen}
              //@ts-ignore
              options={({ route }) => ({ title: route.params.title })}
            />

            <Stack.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CreateHabit"
              component={CreateHabitScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="EditHabit"
              component={EditHabitScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Journal"
              component={JournalScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="New Note"
              component={NewNoteScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Edit Note"
              component={EditNoteScreen}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;

/** 
          <Stack.Screen
            name="CreateHabit"
            component={CreateHabitScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditHabit"
            component={EditHabitScreen}
            options={{ headerShown: false }}
          />
          */
