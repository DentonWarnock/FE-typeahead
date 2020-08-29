import React, { useState, useEffect, useRef } from "react";
import "../Styles/main.css";

const Typeahead = (props) => {
  const { colorsList } = props;
  const [userSearch, setUserSearch] = useState("");
  const [foundMatch, setFoundMatch] = useState(false);
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState(colorsList);
  const displayRef = useRef(null);

  useEffect(() => {
    if (!userSearch) {
      setDisplay(false);
      setFoundMatch(false);
    } else {
      if (!foundMatch) setDisplay(true);
    }
  }, [userSearch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKeyDown);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current: view } = displayRef;
    if (view && !view.contains(event.target)) {
      setDisplay(false);
    }
  };

  const handleEscapeKeyDown = ({ key }) => {
    if (key === "Escape") {
      setDisplay(false);
    }
  };

  const handleChange = (event) => {
    setUserSearch(event.target.value);
    if (userSearch !== "") setDisplay(true);
  };

  const filterOptions = () => {
    if (userSearch !== "") {
      let results = options.filter((color) =>
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
      </div>
    );
  };

  const handleResultClick = (string) => {
    setUserSearch(string); // update input search
    setFoundMatch(true);
    setDisplay(false); // close display options
  };

  const handleEnterKeyPress = (handleResultClick) => ({ key }) => {
    console.log(key);
    if (key === "Enter") {
      handleResultClick();
    }
  };

  return (
    <div className="search-container">
      <input
        id="search"
        onClick={() => setDisplay(!display)}
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
  );
};

export default Typeahead;
