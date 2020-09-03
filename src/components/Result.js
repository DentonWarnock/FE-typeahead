import React from "react";
import Color from "./Color.js";
import PropTypes from "prop-types";

export default function Result(props) {
  const {
    resultString,
    handleResultClick,
    handleEnterKeyResult,
    userSearch,
  } = props;

  const matchingSubStringBold = resultString.slice(0, userSearch.length);
  const nonMatchingSubString = resultString.slice(userSearch.length);

  Color.propTypes = {
    color: PropTypes.string,
  };

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
