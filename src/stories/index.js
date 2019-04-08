import React, { useState } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withKnobs, select } from "@storybook/addon-knobs";

import { Button, Welcome } from "@storybook/react/demo";
import { FetchGhost } from "../components/Ghost";
import VideoPoster from "../components/VideoPoster";
import FloorPlan from "../components/FloorPlan";
import { Ticket } from "../components/CssGrid";
import Posenet, { ReplayPosenet } from "../components/Posenet";
import Form from "../components/Formik";
import Table from "../components/Table";
import Comment from "../components/CommentBox";
import Particles from "../components/Animations/Particles";
import SimplexTubes from "../components/Animations/SimplexTubes";
import Fetch, {
  FetchWithoutReducer
} from "../components/ReducerHooksFetch/index";
import DynamicCursor from "../components/Cursors";
import Camera from "../components/Camera";
import {
  BrightnessPredictor,
  BrightnessTrainer,
  BrightnessDataCollector
} from "../components/Tensorflow";

import Basic from "../components/basic";
import BasicHooks from "../components/basichooks";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button 2</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

const ghost = storiesOf("Ghost", module);
ghost.addDecorator(withKnobs);
ghost.add("REST API", () => {
  const label = "themes";
  const options = {
    gallery: "gallery",
    blog: "blog"
  };
  const defaultValue = "gallery";
  const groupId = "GROUP-ID1";

  const value = select(label, options, defaultValue, groupId);

  return <FetchGhost theme={value} />;
});

storiesOf("Test", module)
  .add("component", () => <Basic />)
  .add("hooks", () => <BasicHooks />);

storiesOf("VideoPoster", module).add("Simple", () => <VideoPoster />);

storiesOf("Floor Plan", module).add("Static", () => <FloorPlan />);

storiesOf("CSS Grid", module).add("Ticket", () => <Ticket />);

storiesOf("Posenet", module)
  .add("Compete", () => <Posenet />)
  .add("Replay", () => <ReplayPosenet />);

const formik = storiesOf("Forms", module);
formik.addDecorator(withKnobs);
formik.add("Basic Forms", () => {
  const label = "Types";
  const options = {
    login: "login",
    email: "email",
    generic: "generic"
  };
  const defaultValue = "email";
  const groupId = "GROUP-ID2";

  const value = select(label, options, defaultValue, groupId);

  return <Form template={value} />;
});

storiesOf("Tables", module).add("Infinite", () => <Table />);

storiesOf("Comment Box", module).add("Comment", () => <Comment />);

storiesOf("Animations", module)
  .add("2D Particles", () => <Particles />)
  .add("Simplex Tubes", () => <SimplexTubes />);

storiesOf("Fetching with Reducers", module)
  .add("With Reducer", () => <Fetch />)
  .add("Without Reducer", () => <FetchWithoutReducer />);

storiesOf("Cursors", module).add("Magnetic Circle (WIP)", () => (
  <DynamicCursor type="default" />
));

storiesOf("Camera", module).add("Camera with onRef", () => <Camera />);

storiesOf("ML - Tensorflow", module)
  .add("Brightness Data Collector", () => <BrightnessDataCollector />)
  .add("Brightness Predictor", () => <BrightnessPredictor />)
  .add("Brightness Trainer", () => <BrightnessTrainer />);
