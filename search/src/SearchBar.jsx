import React, { useState, useReducer, useEffect } from "react";
import countryData from "../resources/countryData.json";
import "./App.css";

const Searchbar = () => {
  const [word, setWord] = useState("");
  const [suggestions, setValue] = useState([]);
  const [showValue, setPossibleValue] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPossibleValue(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (word) {
      const reValues = countryData
        .filter((country) =>
          country.name.toLowerCase().startsWith(word.toLowerCase())
        )
        .map((country) => country.name);
      setValue(reValues);
      setPossibleValue(true);
    } else {
      setValue([]);
      setPossibleValue(false);
    }
  }, [word]);

  const valueCh = (event) => {
    setWord(event.target.value);
  };

  const handleSearch = () => {
    console.log(word);
  };

  return (
    <div>
      <div className="searchBar">
        <input
          id="place"
          value={word}
          onChange={valueCh}
          placeholder="Search for any location"
          className="search-input"
        />
        <button onClick={handleSearch} className="box">
          Search
        </button>
      </div>
      {showValue && (
        <ul className="info">
          {suggestions.map((country, index) => (
            <li key={index}>{country}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;