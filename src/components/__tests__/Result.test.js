import React from "react";
import ReactDOM from "react-dom";
import Result from "../Result.js";

const myTestFunction = () => {
  return "test function";
};

it("renders without crashing and displays results with text", () => {
  const root = document.createElement("div");
  ReactDOM.render(
    <Result
      resultString={"blue"}
      handleResultClick={myTestFunction}
      handleEnterKeyResult={myTestFunction}
      userSearch="bl"
    />,
    root
  );

  expect(root.querySelector("div").innerHTML).toBe(
    '<b>bl</b>ue<div data-testid="test-color-el" class="color-element" style="background: blue;"></div>'
  );
});
