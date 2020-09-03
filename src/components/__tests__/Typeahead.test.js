import React from "react";
import ReactDOM from "react-dom";
import Typeahead from "../Typeahead.js";

it("renders without crashing, contains a div with background 'white' and empty input", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Typeahead />, root);

  expect(root.querySelector("div").style.background).toBe("white");
  expect(root.querySelector("input").textContent).toBe("");
});
