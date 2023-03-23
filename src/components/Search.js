import React, { useEffect } from "react";
import Header from "./Header";
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
      if (createPages.length === 1000) {
        break;
      }
      createPages.push(i + 1);
    }
    setPages(createPages);
  }

  function goToPageNumber(page) {
    setCurrentPage(page);
    enterSearch();
  }

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
