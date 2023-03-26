import React from "react";
import dark from "./../images/darktheme.png";
import light from "./../images/lighttheme.png";
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

  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <div className="headerContainer">
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
      </form>
      <button onClick={changeTheme} className="themeButton">
        <img src={theme === "light" ? light : dark} alt="theme"></img>
      </button>
    </div>
  );
}
