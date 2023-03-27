import React, { useEffect } from "react";
import Header from "./Header";
import Tags from "./Tags";
import whitehome from "./../images/whitehome.png";
import blackhome from "./../images/blackhome.png";
import Footer from "./Footer";
import "./../styles/Frame.css";
import ThemeIcon from "./ThemeIcon";

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className="frameContainer">
      <button onClick={() => goToHomePage()} className="homeButton">
        <img src={theme === "dark" ? whitehome : blackhome} alt="home" />
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
        <div className="sideBar">
          <div className="framedWorkInfo">
            <h3 className="framedWorkTitle">{title}</h3>

            <h4>{artist}</h4>
            <h5>{date}</h5>
          </div>
          <div className="tagContainer">
            <Tags
              terms={terms}
              navigate={navigate}
              enterSearch={enterSearch}
              setQuery={setQuery}
            />
          </div>
        </div>
        <div className="framedImage">
          <img src={imgUrl} alt={title}></img>
        </div>
      </main>
      <footer>
        <Footer theme={theme} />
      </footer>
    </div>
  );
}
