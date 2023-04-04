import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./../styles/Home.css";
import Footer from "./Footer";
import unfavorite from "./../images/unfavorite.png";
import favorite from "./../images/favorite.png";

export default function Home({
  navigate,
  setQuery,
  query,
  enterSearch,
  frameArtWork,
  theme,
  setTheme,
  iconSrc,
  setIconSrc,
  favorites,
  toggleFavorite,
  setCurrentFavPage,
}) {
  const [newWorks, setNewWorks] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
  }, [theme]);

  async function fetchData() {
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?fields=id,artist_display,title,date_display,image_id,term_titles&query[term][is_public_domain]=true&limit=12",
      {
        headers: {
          "AIC-User-Agent": "Art-Gallery (nickkline9931@gmail.com)",
        },
      }
    );
    const data = await response.json();
    const artData = data.data;
    const filteredData = artData.filter((item) => {
      return item.image_id !== null;
    });
    setNewWorks(filteredData);
  }

  const newDisplay = newWorks.map((work, index) => {
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
    <div className="homeContainer">
      <header>
        <Header
          query={query}
          enterSearch={enterSearch}
          setQuery={setQuery}
          navigate={navigate}
          theme={theme}
          setTheme={setTheme}
          iconSrc={iconSrc}
          setIconSrc={setIconSrc}
          setCurrentFavPage={setCurrentFavPage}
        />
      </header>
      <main>
        <h1 data-testid="lastUpdated">
          <span>Last Updated</span>
        </h1>
        <ul className="worksList">{newDisplay}</ul>
      </main>
      <footer>
        <Footer theme={theme} />
      </footer>
    </div>
  );
}
