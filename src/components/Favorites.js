import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import Header from "./Header";
import Footer from "./Footer";
import unfavorite from "./../images/unfavorite.png";
import favorite from "./../images/favorite.png";
import "./../styles/Favorites.css";

export default function Favorites({
  setTheme,
  theme,
  navigate,
  favorites,
  toggleFavorite,
  frameArtWork,
  query,
  setQuery,
  enterSearch,
  currentFavPage,
  setCurrentFavPage,
}) {
  const [favoritesPages, setFavoritesPages] = useLocalStorageState(
    "favoritesPages",
    {
      defaultValue: [1],
    }
  );

  const [currentFavDisplay, setCurrentFavDisplay] = useLocalStorageState(
    "currentFavDisplay",
    {
      defaultValue: [],
    }
  );

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    getFavoritesPages();
  }, [favorites]);

  useEffect(() => {
    getFavDisplay();
  }, [currentFavPage]);

  useEffect(() => {
    fixCurrentPage();
  }, [favoritesPages]);

  function getFavoritesPages() {
    if (favorites.length > 15) {
      const createPages = [];

      for (let i = 0; i < Math.ceil(favorites.length / 15); i++) {
        createPages.push(i + 1);
      }
      setFavoritesPages(createPages);
    } else {
      setFavoritesPages([1]);
    }
  }

  function goToPage(page) {
    setCurrentFavPage(page);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function goToFirstFavPage() {
    setCurrentFavPage(1);
  }

  function goToLastFavPage() {
    setCurrentFavPage(favoritesPages[favoritesPages.length - 1]);
  }

  function getFavDisplay() {
    if (favorites.length <= 15) {
      setCurrentFavDisplay(favorites);
    } else {
      if (currentFavPage === 1) {
        const getDisplay = favorites.slice(0, 15);
        setCurrentFavDisplay(getDisplay);
      } else {
        const getDisplay = favorites.slice(
          15 * (currentFavPage - 1),
          15 * (currentFavPage - 1) + 15
        );
        setCurrentFavDisplay(getDisplay);
      }
    }
  }

  function fixCurrentPage() {
    if (currentFavPage >= favoritesPages.length) {
      setCurrentFavPage(favoritesPages.length);
    }
  }

  const favoritesDisplay = currentFavDisplay.map((work, index) => {
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
          className="thumbNailImg"
          src={
            "https://www.artic.edu/iiif/2/" +
            work.image_id +
            "/full/843,/0/default.jpg"
          }
          alt={work.title}
          onClick={() => frameArtWork(work)}
        />
        <h4 className="thumbNailTitles">{work.title}</h4>
        <h5 className="thumbNailArtists">{work.artist_display}</h5>
      </li>
    );
  });

  const pageNavigation = favoritesPages.map((page, index) => {
    return (
      <div
        key={index}
        style={
          currentFavPage < 5
            ? page < 6
              ? { display: "flex" }
              : { display: "none" }
            : (page <= currentFavPage && page > currentFavPage - 4) ||
              page === currentFavPage + 1
            ? { display: "flex" }
            : { display: "none" }
        }
      >
        <button
          className="pageButton"
          key={index}
          onClick={() => goToPage(page)}
          style={
            currentFavPage === page ? { color: "#CC00CC" } : { color: "blue" }
          }
        >
          {page}
        </button>
      </div>
    );
  });

  return (
    <div className="favoritesContainer">
      <header>
        <Header
          setTheme={setTheme}
          theme={theme}
          navigate={navigate}
          query={query}
          setQuery={setQuery}
          enterSearch={enterSearch}
          setCurrentFavPage={setCurrentFavPage}
        />
      </header>
      <main>
        <h1>Favorites({favorites.length})</h1>
        <h3>
          Page {currentFavPage} of {favoritesPages.length}
        </h3>
        <ul className="worksList" id="favoriteWorks">
          {favoritesDisplay}
        </ul>
        <div
          className="pageNavBar"
          style={
            favoritesPages.length < 2
              ? { display: "none" }
              : { display: "flex" }
          }
        >
          <button onClick={goToFirstFavPage} className="arrowButton">
            &lt;&lt;
          </button>
          <div className="pageNumbers">{pageNavigation}</div>
          <button onClick={goToLastFavPage} className="arrowButton">
            &gt;&gt;
          </button>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
