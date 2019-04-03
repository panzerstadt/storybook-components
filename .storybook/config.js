import { configure, addDecorator } from "@storybook/react";
import "@storybook/addon-console";
import { withInfo } from "@storybook/addon-info";

function loadStories() {
  require("../src/stories");
}

addDecorator(withInfo);
configure(loadStories, module);
