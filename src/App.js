import React from "react";
import { usePersistentState } from "react-persistent-state";
import useLocalStorageState from "use-local-storage-state";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Frame from "./components/Frame";
import Search from "./components/Search";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [title, setTitle] = usePersistentState("");
  const [artist, setArtist] = usePersistentState("");
  const [date, setDate] = usePersistentState("");
  const [terms, setTerms] = usePersistentState([]);
  const [imgUrl, setImgUrl] = usePersistentState("");
  const [query, setQuery] = usePersistentState("");
  const [searchResults, setSearchResults] = usePersistentState([]);
  const [totalPages, setTotalPages] = usePersistentState(0);
  const [currentPage, setCurrentPage] = usePersistentState(1);
  const [theme, setTheme] = usePersistentState("dark");
  const [iconSrc, setIconSrc] = usePersistentState("./../images/darktheme.png");

  async function enterSearch() {
    const data = await fetch(
      "https://api.artic.edu/api/v1/artworks/search?q=" +
        query +
        "&fields=title,artist_display,date_display,term_titles,image_id&query[term][is_public_domain]=true&page=" +
        currentPage +
        "&limit=10"
    );
    const results = await data.json();
    const resultItems = results.data;
    setSearchResults(resultItems);
    const pagination = results.pagination;
    const pageTotal = pagination.total_pages;
    setTotalPages(pageTotal);
    navigate("/search");
  }

  function goToHomePage() {
    navigate("/");
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
            iconSrc={iconSrc}
            setIconSrc={setIconSrc}
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
            goToHomePage={goToHomePage}
            theme={theme}
            setTheme={setTheme}
            iconSrc={iconSrc}
            setIconSrc={setIconSrc}
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
            goToHomePage={goToHomePage}
            frameArtWork={frameArtWork}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            theme={theme}
            setTheme={setTheme}
            iconSrc={iconSrc}
            setIconSrc={setIconSrc}
          />
        }
      />
    </Routes>
  );
}
