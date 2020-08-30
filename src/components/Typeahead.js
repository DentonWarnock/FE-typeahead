import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Color from "./Color.js";
import "../Styles/main.css";

export default function Typeahead(props) {
  const { list } = props;
  const [options, setOptions] = useState(list);
  const [userSearch, setUserSearch] = useState("");
  const [foundMatch, setFoundMatch] = useState(false);
  const [match, setMatch] = useState("");
  const [display, setDisplay] = useState(false);
  const clickOutsideRef = useRef(null);

  useEffect(() => {
    if (!userSearch) {
      setDisplay(false);
      setFoundMatch(false);
      setMatch("");
    } else if (!foundMatch) {
      setDisplay(true);
    } else if (userSearch !== match) {
      setFoundMatch(false);
      setMatch("");
    }
  }, [userSearch, match, foundMatch]);

  useEffect(() => {
    setOptions(list);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKeyDown);
    };
  }, [list]);

  // close the list if user clicks outside of .result div
  const handleClickOutside = (event) => {
    console.log(clickOutsideRef);
    // const { current: click } = clickOutsideRef;
    if (
      clickOutsideRef.current &&
      !clickOutsideRef.current.contains(event.target)
    ) {
      setDisplay(false);
      // clickOutsideRef.current = null;
    }
  };

  const handleEscapeKeyDown = ({ key }) => {
    if (key === "Escape") {
      setDisplay(false);
    }
  };

  const handleChange = (event) => {
    setUserSearch(event.target.value);
    if (userSearch) setDisplay(true);
  };

  const filterOptions = () => {
    if (userSearch) {
      const results = options.filter((color) =>
        color.toLowerCase().startsWith(userSearch.toLowerCase())
      );
      return results.map((string, index) => {
        return boldExactString(string, userSearch, index);
      });
    } else {
      return;
    }
  };

  // returns div with portion of string matching query as 'bold' text
  const boldExactString = (string, query, index) => {
    const boldQuery = string.slice(0, query.length);
    const notBoldText = string.slice(query.length);
    return (
      <div
        className="result"
        onClick={() => handleResultClick(string)}
        onKeyPress={() => handleEnterKeyPress(handleResultClick(string))}
        key={index}
        tabIndex="0"
      >
        <b>{boldQuery}</b>
        {notBoldText}
        <Color color={string} />
      </div>
    );
  };

  const handleResultClick = (string) => {
    console.log("RESULT!!!!!!!!!!!!!!!!!!!!", string);
    setUserSearch(string); // update input to match the result (string)
    setFoundMatch(true); // prevents display from becoming true when input field is changed by useEffect
    setMatch(string); //
    setDisplay(false); // close display view
  };
  // detect when user presses enter on a result and treat same as click
  const handleEnterKeyPress = (handleResultClick) => ({ key }) => {
    if (key === "Enter") {
      handleResultClick();
    }
  };

  Typeahead.propTypes = {
    list: PropTypes.arrayOf(PropTypes.string),
  };

  return (
    <>
      <Color color={match} />
      <div className="search-container">
        <input
          id="search"
          onClick={() => setDisplay(true)}
          value={userSearch}
          name="search"
          type="text"
          placeholder=" Search by color"
          onChange={handleChange}
          autoComplete="off"
        />

        {display && (
          <div ref={clickOutsideRef} className={"search-container"}>
            {filterOptions() &&
              filterOptions().map((div) => {
                return div;
              })}
          </div>
        )}
      </div>
    </>
  );
}
