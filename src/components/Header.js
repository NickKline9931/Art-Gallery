import React from "react";
import "./../styles/Header.css";
import darkSearch from "./../images/darksearch.png";
import lightSearch from "./../images/lightsearch.png";

export default function Header({
  query,
  enterSearch,
  setQuery,
  theme,
  setTheme,
}) {
  function changeQuery(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="headerContainer">
      <input
        type="text"
        value={query}
        onChange={changeQuery}
        id="searchBox"
      ></input>
      <button
        type="button"
        onClick={() => enterSearch()}
        data-testid="searchButton"
        className="searchButton"
      >
        <img src={theme === "light" ? lightSearch : darkSearch} />
      </button>
    </div>
  );
}
