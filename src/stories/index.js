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
