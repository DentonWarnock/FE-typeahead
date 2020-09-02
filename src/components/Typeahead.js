import React, { useState, useEffect, useRef } from "react";
import Color from "./Color.js";
import Result from "./Result.js";
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

  // return results from props.list that start with userSearch (case insensitive)
  const filterList = () => {
    if (userSearch) {
      return list.filter((string) =>
        string.toLowerCase().startsWith(userSearch.toLowerCase())
      );
    }
  };

  // when user clicks a result, make result string = input value / set result string as match / close display
  const handleResultClick = (string) => {
    setUserSearch(string); // update input to match the result (string)
    setFoundMatch(true); // prevents display from becoming true when input field is changed by useEffect
    setMatch(string); // will be sent as props to <Color/>
    setDisplay(false);
  };

  // detect when user presses enter on a result and treat same as click
  const handleEnterKeyResult = (handleResultClick) => (event) => {
    if (event.key === "Enter") {
      handleResultClick();
    }
  };

  const handleEnterKeyInput = (event) => {
    if (event.key === "Enter") {
      handleResultClick(userSearch);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setFoundMatch(true);
    setMatch(userSearch);
    setDisplay(false);
  };

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKeyDown);
    };
  }, []);

  Color.propTypes = {
    color: PropTypes.string,
  };

  Result.propTypes = {
    resultString: PropTypes.string,
    handleResultClick: PropTypes.func,
    handleEnterKeyResult: PropTypes.func,
    userSearch: PropTypes.string,
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
            tabIndex="0"
          />
          <button tabIndex="-1" type="submit" className="button">
            <img src={Icon} alt="search" />
          </button>
        </form>
        {display &&
          filterList() &&
          filterList().map((string, index) => {
            return (
              <Result
                resultString={string}
                key={index}
                userSearch={userSearch}
                handleResultClick={handleResultClick}
                handleEnterKeyResult={handleEnterKeyResult}
              />
            );
          })}
      </div>
    </>
  );
}
