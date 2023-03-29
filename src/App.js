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
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  const [title, setTitle] = useLocalStorageState("title", {
    defaultValue: "",
  });
  const [artist, setArtist] = useLocalStorageState("artist", {
    defaultValue: "",
  });
  const [date, setDate] = useLocalStorageState("date", {
    defaultValue: "",
  });
  const [terms, setTerms] = useLocalStorageState("terms", {
    defaultValue: [],
  });
  const [imgUrl, setImgUrl] = useLocalStorageState("imgUrl", {
    defaultValue: "",
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

  const [homeButtonDisplay, setHomeButtonDisplay] = useLocalStorageState(
    "homeButtonDisplay",
    {
      defaultValue: "",
    }
  );

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
    console.log(work);
  }

  async function enterSearch() {
    setCurrentPage(1);
    const data = await fetch(
      "https://api.artic.edu/api/v1/artworks/search?q=" +
        query +
        "&fields=title,artist_display,date_display,term_titles,image_id&query[term][is_public_domain]=true&page=1&limit=10",
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
    const workTitle = work.title;
    setTitle(workTitle);
    const workArtist = work.artist_display;
    setArtist(workArtist);
    const workDate = work.date_display;
    setDate(workDate);
    const workTerms = work.term_titles;
    setTerms(workTerms);
    const imgUrl =
      "https://www.artic.edu/iiif/2/" +
      work.image_id +
      "/full/843,/0/default.jpg";
    setImgUrl(imgUrl);
    navigate("/frame");
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            setTitle={setTitle}
            setArtist={setArtist}
            setDate={setDate}
            setTerms={setTerms}
            setImgUrl={setImgUrl}
            query={query}
            setQuery={setQuery}
            navigate={navigate}
            enterSearch={enterSearch}
            frameArtWork={frameArtWork}
            theme={theme}
            setTheme={setTheme}
            terms={terms}
            homeButtonDisplay={homeButtonDisplay}
            setHomeButtonDisplay={setHomeButtonDisplay}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        }
      />
      <Route
        path="/frame"
        element={
          <Frame
            setTitle={setTitle}
            setArtist={setArtist}
            setDate={setDate}
            setTerms={setTerms}
            setImgUrl={setImgUrl}
            title={title}
            artist={artist}
            date={date}
            terms={terms}
            imgUrl={imgUrl}
            query={query}
            setQuery={setQuery}
            navigate={navigate}
            enterSearch={enterSearch}
            theme={theme}
            setTheme={setTheme}
            homeButtonDisplay={homeButtonDisplay}
            setHomeButtonDisplay={setHomeButtonDisplay}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
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
            homeButtonDisplay={homeButtonDisplay}
            setHomeButtonDisplay={setHomeButtonDisplay}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            navigate={navigate}
          />
        }
      />
      <Route
        path="/favorites"
        element={
          <Favorites
            setHomeButtonDisplay={setHomeButtonDisplay}
            homeButtonDisplay={homeButtonDisplay}
            setTheme={setTheme}
            theme={theme}
            navigate={navigate}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            frameArtWork={frameArtWork}
            query={query}
            setQuery={setQuery}
            enterSearch={enterSearch}
          />
        }
      />
    </Routes>
  );
}
