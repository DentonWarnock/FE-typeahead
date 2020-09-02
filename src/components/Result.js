import React from "react";
import Color from "./Color.js";

export default function Result(props) {
  const {
    resultString,
    handleResultClick,
    handleEnterKeyResult,
    userSearch,
  } = props;

  const matchingSubStringBold = resultString.slice(0, userSearch.length);
  const nonMatchingSubString = resultString.slice(userSearch.length);

  return (
    <div
      className="result"
      onClick={() => handleResultClick(resultString)}
      onKeyPress={() => handleEnterKeyResult(handleResultClick(resultString))}
      tabIndex="0"
    >
      <b>{matchingSubStringBold}</b>
      {nonMatchingSubString}
      <Color color={resultString} />
    </div>
  );
}
