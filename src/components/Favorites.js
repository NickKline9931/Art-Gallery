import React, { useEffect } from "react";
import Header from "./Header";

export default function Favorites({
  setHomeButtonDisplay,
  homeButtonDisplay,
  setTheme,
  theme,
  navigate,
}) {
  useEffect(() => {
    setHomeButtonDisplay("on");
  }, []);

  return (
    <div>
      <header>
        <Header
          homeButtonDisplay={homeButtonDisplay}
          setTheme={setTheme}
          theme={theme}
          navigate={navigate}
        />
      </header>
      <main>
        <h1>Favorites</h1>
      </main>
    </div>
  );
}
