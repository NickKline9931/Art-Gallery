import React from "react";
import dark from "./../images/darktheme.png";
import light from "./../images/lighttheme.png";

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
    <div className={theme}>
      <input
        type="text"
        value={query}
        onChange={changeQuery}
        id="searchBox"
      ></input>
      <button onClick={() => enterSearch()} data-testid="searchButton">
        Search
      </button>
      <button onClick={changeTheme}>
        <img src={theme === "light" ? light : dark} alt="theme"></img>
      </button>
    </div>
  );
}
