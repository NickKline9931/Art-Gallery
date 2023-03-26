import React from "react";
import dark from "./../images/darktheme.png";
import light from "./../images/lighttheme.png";
import "./../styles/ThemeIcon.css";

export default function ThemeIcon({ theme, setTheme }) {
  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <div className="themeIconContainer">
      <img
        src={theme === "light" ? light : dark}
        alt="theme"
        onClick={changeTheme}
        className="themeIcon"
      />
    </div>
  );
}
