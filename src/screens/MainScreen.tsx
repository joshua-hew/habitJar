import React, { Component, PureComponent } from "react";
import { StyleSheet, StatusBar, Dimensions, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, CreateBox, MoveBox, CleanBoxes } from "../systems/BoxSystems";
import { Box } from "../renderers/BoxRenderer";
import Matter from "matter-js";

// @ts-ignore
Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

const Game = (props: any) => {
  const { width, height } = Dimensions.get("window");
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);

  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;
  /** 
  // pink box that spawns by default
  const pinkbody = Matter.Bodies.rectangle(width / 2, -1000, boxSize, boxSize, {
    frictionAir: 0.021,
  });
  const greenbody = Matter.Bodies.rectangle(width / 2, -100, boxSize, boxSize, {
    frictionAir: 0.021,
  });
  */

  // test spawning in last known location
  const pinkbody = Matter.Bodies.rectangle(
    94.56665792175562,
    691.9685795443771,
    boxSize,
    boxSize,
    {
      frictionAir: 0.021,
    }
  );
  const oldCoordinates = [159.60091044569666, 691.9798305196832]; // Additionally, even when spawn location is identical, they will still be seperated
  const greenbody = Matter.Bodies.rectangle(
    94.56665792175562,
    691.9685795443771,
    boxSize,
    boxSize,
    {
      frictionAir: 0.021,
    }
  );
  const initialBodies = [pinkbody, greenbody];
  const initialEntities = [
    {
      pinkBox: {
        body: pinkbody,
        size: [boxSize, boxSize],
        color: "pink",
        renderer: Box,
      },
    },
    {
      greenBox: {
        body: greenbody,
        size: [boxSize, boxSize],
        color: "green",
        renderer: Box,
      },
    },
  ];

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
  Matter.World.add(world, [...initialBodies, floor]);
  Matter.World.addConstraint(world, constraint);

  // Add initial entities to entities
  let entities = {
    physics: { engine: engine, world: world, constraint: constraint },
    floor: {
      body: floor,
      size: [width, boxSize],
      color: "#86E9BE",
      renderer: Box,
    },
  };

  for (let e of initialEntities) {
    entities = Object.assign(e, entities);
  }

  return (
    <GameEngine
      systems={[Physics, CreateBox, MoveBox, CleanBoxes]}
      //systems={[Physics, CreateBox, MoveBox]}
      /** 
      entities={{
        physics: { engine: engine, world: world, constraint: constraint },
        pinkbox: {
          body: pinkbody,
          size: [boxSize, boxSize],
          color: "pink",
          renderer: Box,
        },
        greenbox: {
          body: greenbody,
          size: [boxSize, boxSize],
          color: "green",
          renderer: Box,
        },
        floor: {
          body: floor,
          size: [width, boxSize],
          color: "#86E9BE",
          renderer: Box,
        },
      }} 
      */
      entities={entities}
    >
      <StatusBar hidden={true} />
    </GameEngine>
  );
};

export { Game };

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
