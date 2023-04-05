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
  favorites,
  toggleFavorite,
  framedWork,
  setCurrentFavPage,
  searchWithTag,
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
          setCurrentFavPage={setCurrentFavPage}
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
            <div className="framedWorkText">
              <h2 className="framedWorkTitle">{framedWork.title}</h2>

              <h4 className="framedWorkArtist">{framedWork.artist_display}</h4>
              <h5 className="framedWorkDate">{framedWork.date_display}</h5>
            </div>
          </div>
          <div className="tagContainer">
            <Tags
              terms={terms}
              navigate={navigate}
              enterSearch={enterSearch}
              setQuery={setQuery}
              searchWithTag={searchWithTag}
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
