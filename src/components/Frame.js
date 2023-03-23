import React from "react";
import Header from "./Header";
import Tags from "./Tags";
import Footer from "./Footer";

export default function Frame({
  setTitle,
  setArtist,
  setDate,
  setTerms,
  setImgUrl,
  title,
  artist,
  date,
  terms,
  imgUrl,
  query,
  setQuery,
  changeQuery,
  navigate,
  enterSearch,
  goToHomePage,
  theme,
  setTheme,
  iconSrc,
  setIconSrc,
}) {
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
        <div className="sideBar">
          <h3 id="frameTitle">{title}</h3>
          <h4 id="frameArtist">{artist}</h4>
          <h5 id="frameDate">{date}</h5>
        </div>
        <div className="imageAndTags">
          <img src={imgUrl} alt={title}></img>
          <Tags
            terms={terms}
            navigate={navigate}
            enterSearch={enterSearch}
            setQuery={setQuery}
          />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
