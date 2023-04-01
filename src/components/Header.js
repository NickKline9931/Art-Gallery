import React from "react";
import "./../styles/Header.css";
import darkSearch from "./../images/darksearch.png";
import lightSearch from "./../images/lightsearch.png";
import whitehome from "./../images/whitehome.png";
import blackhome from "./../images/blackhome.png";
import ThemeIcon from "./ThemeIcon";
import favorite from "./../images/favorite.png";

export default function Header({
  query,
  enterSearch,
  setQuery,
  theme,
  setTheme,
  setCurrentFavPage,
  navigate,
}) {
  function changeQuery(e) {
    setQuery(e.target.value);
  }

  function goToHomePage() {
    navigate("/");
  }

  function goToFavorites() {
    setCurrentFavPage(1);
    navigate("/favorites");
  }

  return (
    <div className="headerContainer">
      <ThemeIcon theme={theme} setTheme={setTheme} />
      <button onClick={() => goToHomePage()} className="homeButton">
        <img src={theme === "dark" ? whitehome : blackhome} alt="home" />
      </button>

      <button
        type="button"
        onClick={goToFavorites}
        className="favoritesButton"
        style={theme === "dark" ? { color: "white" } : { color: "black" }}
      >
        <img src={favorite} alt="f" />
        Favorites
      </button>

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
