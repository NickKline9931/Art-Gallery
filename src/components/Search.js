import React, { useEffect } from "react";
import Header from "./Header";
import "./../styles/Search.css";
import useLocalStorageState from "use-local-storage-state";

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
      if (createPages.length === 100) {
        break;
      }
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
        "&limit=10",
      {
        headers: {
          "AIC-User-Agent": "ArtGallery (nickkline9931@gmail.com)",
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
      <li key={index} onClick={() => frameArtWork(result)}>
        <img
          src={
            "https://www.artic.edu/iiif/2/" +
            result.image_id +
            "/full/843,/0/default.jpg"
          }
          alt={result.title}
        />
        <h4>{result.title}</h4>
        <h5>{result.artist_display}</h5>
      </li>
    );
  });

  const pageNavigation = pages.map((page, index) => {
    return (
      <button
        className="pageButton"
        key={index}
        data-testid={page}
        onClick={() => goToPageNumber(page)}
        style={currentPage === page ? { color: "purple" } : {}}
      >
        {page}
      </button>
    );
  });

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
  }, [theme]);
  return (
    <div className={theme}>
      <header>
        <button onClick={() => goToHomePage()}>Home</button>
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
        <ul>{searchResultsDisplay}</ul>
        <div>{pageNavigation}</div>
      </main>
      <footer>
        <Footer theme={theme} />
      </footer>
    </div>
  );
}
