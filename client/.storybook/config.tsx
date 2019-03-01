import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";

import "../src/index.css";
import "tachyons";

addDecorator(story => (
  <Router>
    <div>{story()}</div>
  </Router>
));

function loadStories() {
  // auth
  require('../src/stories/auth/Login/LoginForm.stories');
  require('../src/stories/auth/SignUp/SignUpForm.stories');
}
configure(loadStories, module);
