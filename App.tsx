import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import store from "./src/store/store";
import { Provider } from "react-redux";
import HomeScreen from "./src/components/HomeScreen";
import CreateHabitScreen from "./src/components/CreateHabitScreen";
import EditHabitScreen from "./src/components/EditHabitScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import { SimpleHabitList } from "./src/components/SimpleHabitList";
import { Counter } from "./src/components/Counter";
import { Game } from "./src/screens/MainScreen";
import { SandboxScreen } from "./src/screens/Sandbox";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Sandbox"
            component={SandboxScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={Game}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
