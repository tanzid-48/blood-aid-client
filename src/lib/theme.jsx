"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children, defaultTheme = "dark" }) {
  const [theme, setThemeState] = useState(defaultTheme);

  useEffect(() => {
    const stored = localStorage.getItem("ba-theme") ?? defaultTheme;
    setThemeState(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, [defaultTheme]);

  const setTheme = (t) => {
    setThemeState(t);
    localStorage.setItem("ba-theme", t);
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeCtx);
}
