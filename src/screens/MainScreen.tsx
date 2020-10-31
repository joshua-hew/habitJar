import React, { Component, PureComponent } from "react";
import { StyleSheet, StatusBar, Dimensions, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, CreateBox, MoveBox, CleanBoxes } from "../systems/BoxSystems";
import { Box } from "../renderers/BoxRenderer";
import Matter from "matter-js";

// @ts-ignore
Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

/** 
export class Game extends Component {
  constructor() {
    // @ts-ignore
    super();
  }

  render() {
    const { width, height } = Dimensions.get("window");
    const boxSize = Math.trunc(Math.max(width, height) * 0.075);

    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    const body = Matter.Bodies.rectangle(width / 2, -1000, boxSize, boxSize, {
      frictionAir: 0.021,
    });
    const floor = Matter.Bodies.rectangle(
      width / 2,
      height - boxSize / 2,
      width,
      boxSize,
      { isStatic: true }
    );
    const constraint = Matter.Constraint.create({
      label: "Drag Constraint",
      pointA: { x: 0, y: 0 },
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 0.1,
      // @ts-ignore
      angularStiffness: 1,
    });

    Matter.World.add(world, [body, floor]);
    Matter.World.addConstraint(world, constraint);

    return (
      <GameEngine
        systems={[Physics, CreateBox, MoveBox, CleanBoxes]}
        entities={{
          physics: { engine: engine, world: world, constraint: constraint },
          box: {
            body: body,
            size: [boxSize, boxSize],
            color: "pink",
            renderer: Box,
          },
          floor: {
            body: floor,
            size: [width, boxSize],
            color: "#86E9BE",
            renderer: Box,
          },
        }}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}
*/

const Game = (props: any) => {
  const { width, height } = Dimensions.get("window");
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);

  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;
  // pink box that spawns by default
  //const body = Matter.Bodies.rectangle(width / 2, -1000, boxSize, boxSize, {
  //  frictionAir: 0.021,
  //});
  const floor = Matter.Bodies.rectangle(
    width / 2,
    height - boxSize / 2,
    width,
    boxSize,
    { isStatic: true }
  );
  const constraint = Matter.Constraint.create({
    label: "Drag Constraint",
    pointA: { x: 0, y: 0 },
    pointB: { x: 0, y: 0 },
    length: 0.01,
    stiffness: 0.1,
    // @ts-ignore
    angularStiffness: 1,
  });

  //Matter.World.add(world, [body, floor]);
  Matter.World.add(world, [floor]);
  Matter.World.addConstraint(world, constraint);

  return (
    <GameEngine
      systems={[Physics, CreateBox, MoveBox, CleanBoxes]}
      //systems={[Physics, CreateBox, MoveBox]}
      entities={{
        physics: { engine: engine, world: world, constraint: constraint },
        //box: {
        //  body: body,
        //  size: [boxSize, boxSize],
        //  color: "pink",
        //  renderer: Box,
        //},
        floor: {
          body: floor,
          size: [width, boxSize],
          color: "#86E9BE",
          renderer: Box,
        },
      }}
    >
      <StatusBar hidden={true} />
    </GameEngine>
  );
};

export { Game };
