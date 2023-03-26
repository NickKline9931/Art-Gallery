import React, { useEffect } from "react";
import Header from "./Header";
import whitehome from "./../images/whitehome.png";
import blackhome from "./../images/blackhome.png";
import "./../styles/Search.css";
import useLocalStorageState from "use-local-storage-state";
import ThemeIcon from "./ThemeIcon";

import Footer from "./Footer";

export default function Search({
  query,
  setQuery,
  changeQuery,
  searchResults,
  setSearchResults,
  enterSearch,
  goToHomePage,
  navigate,
  frameArtWork,
  totalPages,
  currentPage,
  setCurrentPage,
  theme,
  setTheme,
  iconSrc,
  setIconSrc,
}) {
  const [pages, setPages] = useLocalStorageState("pages", {
    defaultValue: [],
  });

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
        "&fields=title,artist_display,date_display,term_titles,image_id&query[term][is_public_domain]=true&page=" +
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

  useEffect(() => {
    renderPageItems();
  }, [currentPage]);

  useEffect(() => {
    if (totalPages !== 0) {
      getPages();
    }
  }, [totalPages]);

  const searchResultsDisplay = searchResults.map((result, index) => {
    return (
      <li
        key={index}
        onClick={() => frameArtWork(result)}
        className="thumbNails"
      >
        <img
          src={
            "https://www.artic.edu/iiif/2/" +
            result.image_id +
            "/full/843,/0/default.jpg"
          }
          alt={result.title}
        />
        <h4 className="thumbNailTitles">{result.title}</h4>
        <h5>{result.artist_display}</h5>
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

  function goToFirstPage() {
    const firstPage = pages[0];
    setCurrentPage(firstPage);
  }

  function goToLastPage() {
    const lastPage = pages[pages.length - 1];
    setCurrentPage(lastPage);
  }

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
  }, [theme]);
  return (
    <div className="searchContainer">
      <button onClick={() => goToHomePage()} className="homeButton">
        <img src={theme === "dark" ? whitehome : blackhome} />
      </button>
      <ThemeIcon theme={theme} setTheme={setTheme} />
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
        <h1>
          Page {currentPage} of {totalPages}
        </h1>
        <h4>Results</h4>
        <ul className="worksList">{searchResultsDisplay}</ul>
        <div className="pageNavBar">
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
