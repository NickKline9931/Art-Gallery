import React, { useEffect } from "react";
import Header from "./Header";

export default function Favorites({
  setHomeButtonDisplay,
  homeButtonDisplay,
  setTheme,
  theme,
  navigate,
  favorites,
  toggleFavorites,
}) {
  useEffect(() => {
    setHomeButtonDisplay("on");
  }, []);

  const favoritesDisplay = favorites.map((work, index) => {
    return (
      <li key={index}>
        <h2>{work.title}</h2>
      </li>
    );
  });

  return (
    <div>
      <header>
        <Header
          homeButtonDisplay={homeButtonDisplay}
          setTheme={setTheme}
          theme={theme}
          navigate={navigate}
        />
      </header>
      <main>
        <h1>Favorites</h1>
        <ul>{favoritesDisplay}</ul>
      </main>
    </div>
  );
}