import React, { Component, PureComponent } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  ART,
  Dimensions,
} from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { Vector } from "matter-js";

const Box = (props: any) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;
  //const angle = props.body.angle;
  const angle = new Animated.Value(props.body.angle);
  const color = props.color;
  console.log(angle);

  //console.log(props);
  //console.log(color, x, y);

  const thisStyles = StyleSheet.create({
    box: {
      position: "absolute",
      left: x,
      top: y,
      width: width,
      height: height,
      transform: [{ rotate: angle.toString() + "rad" }],
      //transform: [{ rotate: spin }],
      // @ts-ignore
      backgroundColor: color || "pink",
      borderWidth: 4,
    },
  });

  return <Animated.View style={thisStyles.box} />;
};

/** 
class Box extends Component {
//class Box extends PureComponent {
  // @ts-ignore
  constructor(props) {
    super(props);
  }

  render() {
    // @ts-ignore
    const width = this.props.size[0];
    // @ts-ignore
    const height = this.props.size[1];
    // @ts-ignore
    const x = this.props.body.position.x - width / 2;
    // @ts-ignore
    const y = this.props.body.position.y - height / 2;
    // @ts-ignore
    const angle = this.props.body.angle;

    return (
      <View
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          transform: [{ rotate: angle + "rad" }],
          // @ts-ignore
          backgroundColor: this.props.color || "pink",
        }}
      />
    );
  }
}
*/
export { Box };
