import React, { useEffect } from "react";
import Header from "./Header";
import Tags from "./Tags";
import Footer from "./Footer";
import "./../styles/Frame.css";
import unfavorite from "./../images/unfavorite.png";
import favorite from "./../images/favorite.png";

export default function Frame({
  terms,

  query,
  setQuery,
  changeQuery,
  navigate,
  enterSearch,

  theme,
  setTheme,
  iconSrc,
  setIconSrc,
  favorites,
  toggleFavorite,
  framedWork,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className="frameContainer">
      <header>
        <Header
          query={query}
          changeQuery={changeQuery}
          enterSearch={enterSearch}
          setQuery={setQuery}
          navigate={navigate}
          theme={theme}
          setTheme={setTheme}
          iconSrc={iconSrc}
          setIconSrc={setIconSrc}
        />
      </header>
      <main>
        <div className="sideBar">
          <div className="framedWorkInfo">
            <img
              src={
                favorites.some((item) => item.id === framedWork.id)
                  ? favorite
                  : unfavorite
              }
              alt="favorite"
              onClick={() => toggleFavorite(framedWork)}
            />
            <h2 className="framedWorkTitle">{framedWork.title}</h2>

            <h4>{framedWork.artist_display}</h4>
            <h5>{framedWork.date_display}</h5>
          </div>
          <div className="tagContainer">
            <Tags
              terms={terms}
              navigate={navigate}
              enterSearch={enterSearch}
              setQuery={setQuery}
            />
          </div>
        </div>
        <div className="framedImage">
          <img
            src={
              "https://www.artic.edu/iiif/2/" +
              framedWork.image_id +
              "/full/843,/0/default.jpg"
            }
            alt={framedWork.title}
          />
        </div>
      </main>
      <footer>
        <Footer theme={theme} />
      </footer>
    </div>
  );
}
