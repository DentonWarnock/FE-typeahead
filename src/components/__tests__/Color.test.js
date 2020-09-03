import React from "react";
import ReactDOM from "react-dom";
import Color from "../Color.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Color color={"blue"} />, div);
});
