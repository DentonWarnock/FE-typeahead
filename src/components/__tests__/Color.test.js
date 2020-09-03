import React from "react";
import ReactDOM from "react-dom";
import Color from "../Color.js";

it("renders without crashing and displays the color prop as the background style", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Color color={"blue"} />, root);

  expect(root.querySelector("div").style.background).toBe("blue");
  expect(root.querySelector("div").textContent).toBe("");
});
