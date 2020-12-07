import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
import { NavigationContainer, useLinkProps } from "@react-navigation/native";

const Navbar = (props: any) => {
  const navigation = props.navigation;

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => navigation.navigate("Sandbox")}>
        <Text>Sandbox</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => navigation.navigate("Home")}>
        <View style={styles.iconAndTextContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/home.png")}
          />
          <Text style={styles.caption}>Home</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => navigation.navigate("Calendar")}>
        <View style={styles.iconAndTextContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/calendar.png")}
          />
          <Text style={styles.caption}>Calendar</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => navigation.navigate("Journal")}>
        <View style={styles.iconAndTextContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/book.png")}
          />
          <Text style={styles.caption}>Journal</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingBottom: 10,
  },
  iconAndTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  caption: {
    color: "gray",
    fontSize: 12,
    marginTop: 5,
  },
});

export default Navbar;
