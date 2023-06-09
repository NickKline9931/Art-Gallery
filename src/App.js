import React from "react";

import useLocalStorageState from "use-local-storage-state";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Frame from "./components/Frame";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const [currentSearchTerm, setCurrentSearchTerm] = useLocalStorageState(
    "currentSearchTerm",
    {
      defaultValue: "",
    }
  );

  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  const [currentFavPage, setCurrentFavPage] = useLocalStorageState(
    "currentFavPage",
    {
      defaultValue: 1,
    }
  );

  const [framedWork, setFramedWork] = useLocalStorageState("framedWork", {
    defaultValue: {},
  });

  const [terms, setTerms] = useLocalStorageState("terms", {
    defaultValue: [],
  });

  const [query, setQuery] = useLocalStorageState("query", {
    defaultValue: "",
  });
  const [searchResults, setSearchResults] = useLocalStorageState(
    "searchResults",
    {
      defaultValue: [],
    }
  );
  const [totalPages, setTotalPages] = useLocalStorageState("totalPages", {
    defaultValue: 0,
  });
  const [currentPage, setCurrentPage] = useLocalStorageState("currentPage", {
    defaultValue: 0,
  });
  const [theme, setTheme] = useLocalStorageState("theme", {
    defaultValue: "dark",
  });

  function toggleFavorite(work) {
    if (favorites.some((item) => item.id === work.id)) {
      const newFavorites = favorites.filter((item) => {
        return item.id !== work.id;
      });
      setFavorites(newFavorites);
    } else {
      const newFavorites = [...favorites, work];
      setFavorites(newFavorites);
    }
  }

  async function enterSearch() {
    setCurrentPage(1);
    setCurrentSearchTerm(query);
    const data = await fetch(
      "https://api.artic.edu/api/v1/artworks/search?q=" +
        query +
        "&fields=title,artist_display,date_display,term_titles,image_id&query[term][is_public_domain]=true&page=1&limit=12",
      {
        headers: {
          "AIC-User-Agent": "Art-Gallery (nickkline9931@gmail.com)",
        },
      }
    );
    const results = await data.json();
    const resultItems = results.data;
    setSearchResults(resultItems);
    const pagination = results.pagination;
    const pageTotal = pagination.total_pages;
    if (pageTotal < 100) {
      setTotalPages(pageTotal);
    } else {
      setTotalPages(100);
    }
    navigate("/search");
  }

  async function searchWithTag(tag) {
    setQuery(tag);
    setCurrentSearchTerm(tag);
    const data = await fetch(
      "https://api.artic.edu/api/v1/artworks/search?q=" +
        query +
        "&fields=title,artist_display,date_display,term_titles,image_id&query[term][is_public_domain]=true&page=1&limit=12",
      {
        headers: {
          "AIC-User-Agent": "Art-Gallery (nickkline9931@gmail.com)",
        },
      }
    );
    const results = await data.json();
    const resultItems = results.data;
    setSearchResults(resultItems);
    const pagination = results.pagination;
    const pageTotal = pagination.total_pages;
    if (pageTotal < 100) {
      setTotalPages(pageTotal);
    } else {
      setTotalPages(100);
    }
    navigate("/search");
  }

  function frameArtWork(work) {
    const workTerms = work.term_titles;
    setTerms(workTerms);
    setFramedWork(work);

    navigate("/frame");
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            setTerms={setTerms}
            query={query}
            setQuery={setQuery}
            navigate={navigate}
            enterSearch={enterSearch}
            frameArtWork={frameArtWork}
            theme={theme}
            setTheme={setTheme}
            terms={terms}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setCurrentFavPage={setCurrentFavPage}
            currentFavPage={currentFavPage}
          />
        }
      />
      <Route
        path="/frame"
        element={
          <Frame
            setTerms={setTerms}
            terms={terms}
            query={query}
            setQuery={setQuery}
            navigate={navigate}
            enterSearch={enterSearch}
            theme={theme}
            setTheme={setTheme}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            framedWork={framedWork}
            setCurrentFavPage={setCurrentFavPage}
            searchWithTag={searchWithTag}
          />
        }
      />
      <Route
        path="/search"
        element={
          <Search
            setQuery={setQuery}
            query={query}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            enterSearch={enterSearch}
            frameArtWork={frameArtWork}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            theme={theme}
            setTheme={setTheme}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            navigate={navigate}
            setCurrentFavPage={setCurrentFavPage}
            currentSearchTerm={currentSearchTerm}
          />
        }
      />
      <Route
        path="/favorites"
        element={
          <Favorites
            setTheme={setTheme}
            theme={theme}
            navigate={navigate}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            frameArtWork={frameArtWork}
            query={query}
            setQuery={setQuery}
            enterSearch={enterSearch}
            currentFavPage={currentFavPage}
            setCurrentFavPage={setCurrentFavPage}
          />
        }
      />
    </Routes>
  );
}
