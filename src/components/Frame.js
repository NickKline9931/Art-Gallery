import React, { useEffect } from "react";
import Header from "./Header";
import Tags from "./Tags";
import Footer from "./Footer";
import "./../styles/Frame.css";

export default function Frame({
  homeButtonDisplay,
  setHomeButtonDisplay,
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

  theme,
  setTheme,
  iconSrc,
  setIconSrc,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setHomeButtonDisplay("on");
  }, []);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className="frameContainer">
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
          homeButtonDisplay={homeButtonDisplay}
        />
      </header>
      <main>
        <div className="sideBar">
          <div className="framedWorkInfo">
            <h2 className="framedWorkTitle">{title}</h2>

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
