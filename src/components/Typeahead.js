import React, { useState, useEffect, useRef } from "react";
import Color from "./Color.js";
import PropTypes from "prop-types";
import Icon from "../images/search-tab-icon-png.png";
import "../Styles/index.css";

export default function Typeahead({ list }) {
  const [userSearch, setUserSearch] = useState("");
  const [foundMatch, setFoundMatch] = useState(false);
  const [match, setMatch] = useState("");
  const [display, setDisplay] = useState(false);
  const clickOutsideRef = useRef(null);

  useEffect(() => {
    if (!userSearch) {
      // empty input --> don't display results and reset match state
      setDisplay(false);
      setFoundMatch(false);
      setMatch("");
    } else if (!foundMatch) {
      // input and no match --> display results
      setDisplay(true);
    } else if (userSearch !== match) {
      // input and match == true but new input != match --> set match == false (this will hide the main <Color/>)
      setFoundMatch(false);
      setMatch("");
    }
  }, [userSearch, match, foundMatch]);

  const handleInputChange = (event) => {
    setUserSearch(event.target.value);
    if (userSearch) setDisplay(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKeyDown);
    };
  }, []);

  // when user clicks outside of input or the search-container --> close the display
  const handleClickOutside = (event) => {
    if (
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

  // when user enters input return exact matches from props.list as <Result />
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
        onKeyPress={() => handleEnterKeyResult(handleResultClick(string))}
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
  const handleEnterKeyResult = (handleResultClick) => (event) => {
    if (event.key === "Enter") {
      handleResultClick();
    } else {
      handleInputChange(event);
    }
  };

  const handleEnterKeyInput = (event) => {
    if (event.key === "Enter") {
      handleResultClick(userSearch);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setFoundMatch(true); // prevents display from becoming true when input field is changed by useEffect
    setMatch(userSearch);
    setDisplay(false); // close display view
  };

  Color.propTypes = {
    color: PropTypes.string,
  };

  return (
    <>
      <Color color={match} />
      <div ref={clickOutsideRef} className="search-container">
        <form onSubmit={handleOnSubmit}>
          <input
            id="search"
            placeholder=" Search for a color"
            name="search"
            type="text"
            value={userSearch}
            onClick={() => setDisplay(true)}
            onChange={handleInputChange}
            onKeyPress={handleEnterKeyInput}
            autoComplete="off"
            spellCheck="false"
          />
          <button tabIndex="-1" type="submit" className="button">
            <img src={Icon} alt="search" />
          </button>
        </form>
        {display &&
          filterList() &&
          filterList().map((resultDiv) => {
            return resultDiv;
          })}
      </div>
    </>
  );
}
