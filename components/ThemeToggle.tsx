"use client";

import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.dracula);

  const toggleTheme = () => {
    const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-circle btn-sm">
      {theme === "winter" ? (
        <BsMoonFill className="size-4" />
      ) : (
        <BsSunFill className="size-4" />
      )}
    </button>
  );
};
export default ThemeToggle;
