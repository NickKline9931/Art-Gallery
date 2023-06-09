import React, { useEffect } from "react";
import Header from "./Header";
import "./../styles/Search.css";
import useLocalStorageState from "use-local-storage-state";
import unfavorite from "./../images/unfavorite.png";
import favorite from "./../images/favorite.png";

import Footer from "./Footer";

export default function Search({
  query,
  setQuery,
  changeQuery,
  searchResults,
  setSearchResults,
  enterSearch,
  setCurrentFavPage,
  navigate,
  frameArtWork,
  totalPages,
  currentPage,
  setCurrentPage,
  theme,
  setTheme,
  currentSearchTerm,
  favorites,
  toggleFavorite,
}) {
  const [pages, setPages] = useLocalStorageState("pages", {
    defaultValue: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    renderPageItems();
  }, [currentPage]);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (totalPages !== 0) {
      getPages();
    }
  }, [totalPages]);

  function getPages() {
    const createPages = [];

    for (let i = 0; i < totalPages; i++) {
      createPages.push(i + 1);
    }
    setPages(createPages);
  }

  async function goToPageNumber(page) {
    setCurrentPage(page);
  }

  async function renderPageItems() {
    const data = await fetch(
      "https://api.artic.edu/api/v1/artworks/search?q=" +
        query +
        "&fields=id,title,artist_display,date_display,term_titles,image_id&query[term][is_public_domain]=true&page=" +
        currentPage +
        "&limit=12",
      {
        headers: {
          "AIC-User-Agent": "Art-Gallery (nickkline9931@gmail.com)",
        },
      }
    );
    const results = await data.json();
    const resultItems = results.data;
    setSearchResults(resultItems);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function goToFirstPage() {
    const firstPage = pages[0];
    setCurrentPage(firstPage);
  }

  function goToLastPage() {
    const lastPage = pages[pages.length - 1];
    setCurrentPage(lastPage);
  }

  const searchResultsDisplay = searchResults.map((work, index) => {
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

  const pageNavigation = pages.map((page, index) => {
    return (
      <div
        key={index}
        style={
          currentPage < 5
            ? page < 6
              ? { display: "flex" }
              : { display: "none" }
            : (page <= currentPage && page > currentPage - 4) ||
              page === currentPage + 1
            ? { display: "flex" }
            : { display: "none" }
        }
      >
        <button
          className="pageButton"
          key={index}
          data-testid={page}
          onClick={() => goToPageNumber(page)}
          style={
            currentPage === page ? { color: "#CC00CC" } : { color: "blue" }
          }
        >
          {page}
        </button>
      </div>
    );
  });

  return (
    <div className="searchContainer">
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
        <h1>
          Page {currentPage} of {totalPages}
        </h1>
        <h3>Results for {currentSearchTerm}</h3>
        <ul className="searchResults">{searchResultsDisplay}</ul>
        <div
          className="pageNavBar"
          style={totalPages < 2 ? { display: "none" } : { display: "flex" }}
        >
          <button onClick={goToFirstPage} className="arrowButton">
            &lt;&lt;
          </button>
          <div className="pageNumbers">{pageNavigation}</div>
          <button onClick={goToLastPage} className="arrowButton">
            &gt;&gt;
          </button>
        </div>
      </main>
      <footer>
        <Footer theme={theme} />
      </footer>
    </div>
  );
}
