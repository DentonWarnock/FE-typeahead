import React, { useState, useEffect, useRef } from "react";
import Color from "./Color.js";
import "../Styles/main.css";

export default function Typeahead(props) {
  const { list } = props;
  const [options, setOptions] = useState(list);
  const [userSearch, setUserSearch] = useState("");
  const [foundMatch, setFoundMatch] = useState(false);
  const [match, setMatch] = useState("");
  const [display, setDisplay] = useState(false);
  const displayRef = useRef(null);

  useEffect(() => {
    if (!userSearch) {
      setDisplay(false);
      // setFoundMatch(false);
    } else if (!foundMatch) {
      setDisplay(true);
    } else if (userSearch !== match) {
      setFoundMatch(false);
      setMatch("");
    }
  }, [userSearch]);

  useEffect(() => {
    setOptions(list);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKeyDown);
    };
  }, []);

  // close the list if user clicks outside of .result div
  const handleClickOutside = (event) => {
    console.log(displayRef);
    // const { current: click } = displayRef;
    if (displayRef.current && !displayRef.current.contains(event.target)) {
      setDisplay(false);
      // displayRef.current = null;
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
    setUserSearch(string); // update input search
    setFoundMatch(true); // prevents display from becoming true when input is changed
    setDisplay(false); // close display options
    setMatch(string);
  };

  const handleEnterKeyPress = (handleResultClick) => ({ key }) => {
    if (key === "Enter") {
      handleResultClick();
    }
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
          <div ref={displayRef} className={"search-container"}>
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
