import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./../styles/Home.css";
import Footer from "./Footer";

export default function Home({
  setTitle,
  setArtist,
  setDate,
  setTerms,
  setImgUrl,
  navigate,
  setQuery,
  query,
  enterSearch,
  frameArtWork,
  theme,
  setTheme,
  iconSrc,
  setIconSrc,
}) {
  const [newWorks, setNewWorks] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?fields=id,artist_display,title,date_display,image_id,term_titles&query[term][is_public_domain]=true&limit=10"
    );
    const data = await response.json();
    const artData = data.data;
    const filteredData = artData.filter((item) => {
      return item.image_id !== null;
    });
    setNewWorks(filteredData);
  };

  useEffect(() => {
    fetchData();
  });

  const newDisplay = newWorks.map((work, index) => {
    return (
      <li key={index} onClick={() => frameArtWork(work)}>
        <img
          src={
            "https://www.artic.edu/iiif/2/" +
            work.image_id +
            "/full/843,/0/default.jpg"
          }
          alt={work.title}
        />
        <h4>{work.title}</h4>
        <h5>{work.artist_display}</h5>
      </li>
    );
  });

  return (
    <div className={theme}>
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
        />
      </header>
      <main className={theme}>
        <h1>Newest Works</h1>
        <ul className={theme}>{newDisplay}</ul>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
