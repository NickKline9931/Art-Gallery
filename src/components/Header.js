import React from "react";
import "./../styles/Header.css";
import darkSearch from "./../images/darksearch.png";
import lightSearch from "./../images/lightsearch.png";
import whitehome from "./../images/whitehome.png";
import blackhome from "./../images/blackhome.png";
import ThemeIcon from "./ThemeIcon";

export default function Header({
  query,
  enterSearch,
  setQuery,
  theme,
  setTheme,
  goToHomePage,
  homeButtonDisplay,
}) {
  function changeQuery(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="headerContainer">
      <button
        onClick={() => goToHomePage()}
        className="homeButton"
        style={
          homeButtonDisplay === "on" ? { display: "flex" } : { display: "none" }
        }
      >
        <img src={theme === "dark" ? whitehome : blackhome} alt="home" />
      </button>
      <form>
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
        <ThemeIcon theme={theme} setTheme={setTheme} />
      </form>
    </div>
  );
}
