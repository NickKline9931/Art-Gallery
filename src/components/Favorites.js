import React, { useEffect } from "react";
import Header from "./Header";
import unfavorite from "./../images/unfavorite.png";
import favorite from "./../images/favorite.png";
import "./../styles/Favorites.css";

export default function Favorites({
  setHomeButtonDisplay,
  homeButtonDisplay,
  setTheme,
  theme,
  navigate,
  favorites,
  toggleFavorite,
  frameArtWork,
  query,
  setQuery,
  enterSearch,
  favoritesButtonDisplay,
  setFavoritesButtonDisplay,
}) {
  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    setFavoritesButtonDisplay("off");
  }, []);

  useEffect(() => {
    return () => {
      setFavoritesButtonDisplay("on");
    };
  }, []);

  const favoritesDisplay = favorites.map((work, index) => {
    return (
      <li key={index} className="thumbNails">
        <img
          src={
            favorites.some((item) => item.id === work.id)
              ? favorite
              : unfavorite
          }
          alt="favorite"
          onClick={() => toggleFavorite(work)}
        />
        <img
          src={
            "https://www.artic.edu/iiif/2/" +
            work.image_id +
            "/full/843,/0/default.jpg"
          }
          alt={work.title}
          onClick={() => frameArtWork(work)}
        />
        <h4 className="thumbNailTitles">{work.title}</h4>
        <h5>{work.artist_display}</h5>
      </li>
    );
  });

  return (
    <div className="favoritesContainer">
      <header>
        <Header
          homeButtonDisplay={homeButtonDisplay}
          setTheme={setTheme}
          theme={theme}
          navigate={navigate}
          query={query}
          setQuery={setQuery}
          enterSearch={enterSearch}
          favoritesButtonDisplay={favoritesButtonDisplay}
        />
      </header>
      <main>
        <h1>Favorites</h1>
        <ul className="worksList">{favoritesDisplay}</ul>
      </main>
    </div>
  );
}
