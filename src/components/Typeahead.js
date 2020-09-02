import React, { useState, useEffect, useRef } from "react";
import Color from "./Color.js";
import PropTypes from "prop-types";
import "../Styles/index.css";

export default function Typeahead(props) {
  const { list } = props;
  const [userSearch, setUserSearch] = useState("");
  const [foundMatch, setFoundMatch] = useState(false);
  const [match, setMatch] = useState("");
  const [display, setDisplay] = useState(false);
  const clickOutsideRef = useRef(null);

  useEffect(() => {
    if (!userSearch) {
      // empty input --> don't display and reset match state
      setDisplay(false);
      setFoundMatch(false);
      setMatch("");
    } else if (!foundMatch) {
      // input and no match --> display results
      setDisplay(true);
    } else if (userSearch !== match) {
      // input and match == true but now input has changed --> set match == false
      setFoundMatch(false);
      setMatch("");
    }
  }, [userSearch, match, foundMatch]);

  const handleInputChange = (event) => {
    setUserSearch(event.target.value);
    if (userSearch) setDisplay(true);
  };

  useEffect(() => {
    // add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKeyDown);
    return () => {
      // cleanup event listeners
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKeyDown);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      // user clicks outside of input or results div --> close display results
      clickOutsideRef.current &&
      !clickOutsideRef.current.contains(event.target)
    )
      setDisplay(false);
  };

  const handleEscapeKeyDown = ({ key }) => {
    if (key === "Escape") {
      setDisplay(false);
    }
  };

  // return
  const filterList = () => {
    if (userSearch) {
      return list
        .filter((string) =>
          string.toLowerCase().startsWith(userSearch.toLowerCase())
        )
        .map((string, index) => {
          return formatResult(string, index);
        });
    }
  };

  const formatResult = (string, index) => {
    const matchingSubStringBold = string.slice(0, userSearch.length);
    const nonMatchingSubString = string.slice(userSearch.length);
    return (
      <div
        className="result"
        onClick={() => handleResultClick(string)}
        onKeyPress={() => handleEnterKeyPress(handleResultClick(string))}
        key={index}
        tabIndex="0"
      >
        <b>{matchingSubStringBold}</b>
        {nonMatchingSubString}
        <Color color={string} />
      </div>
    );
  };

  const handleResultClick = (string) => {
    setUserSearch(string); // update input to match the result (string)
    setFoundMatch(true); // prevents display from becoming true when input field is changed by useEffect
    setMatch(string);
    setDisplay(false); // close display view
  };
  // detect when user presses enter on a result and treat same as click
  const handleEnterKeyPress = (handleResultClick) => ({ key }) => {
    if (key === "Enter") {
      handleResultClick();
    }
  };

  Color.propTypes = {
    color: PropTypes.string,
  };

  return (
    <>
      <Color color={match} />
      <div ref={clickOutsideRef} className="search-container">
        <input
          id="search"
          onClick={() => setDisplay(true)}
          value={userSearch}
          name="search"
          type="text"
          placeholder=" Search for a color"
          onChange={handleInputChange}
          autoComplete="off"
        />
        {display &&
          filterList() &&
          filterList().map((resultDiv) => {
            return resultDiv;
          })}
      </div>
    </>
  );
}
