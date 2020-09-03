import React from "react";
import ReactDOM from "react-dom";
import Result from "../Result.js";

const myTestFunction = () => {
  return "test function";
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Result
      resultString={"blue"}
      handleResultClick={myTestFunction}
      handleEnterKeyResult={myTestFunction}
      userSearch="bl"
    />,
    div
  );
});
