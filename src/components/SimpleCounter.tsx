import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

interface storeState {
  counter: number;
}

interface counterProps {
  counter: number;
  increaseCounter: () => {};
  decreaseCounter: () => {};
}

const SimpleCounter = (props: counterProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.increaseCounter()}>
        <Text style={{ fontSize: 20 }}>Increase</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20 }}>{props.counter}</Text>
      <TouchableOpacity onPress={() => props.decreaseCounter()}>
        <Text style={{ fontSize: 20 }}>Decrease</Text>
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state: storeState) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    increaseCounter: () => dispatch({ type: "INCREASE_COUNTER" }),
    decreaseCounter: () => dispatch({ type: "DECREASE_COUNTER" }),
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 200,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleCounter);
