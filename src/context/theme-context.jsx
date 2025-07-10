import { createContext, useContext, useEffect } from "react";
import useLocalData from "../hooks/useLocalData";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [themeData, , setThemeData] = useLocalData("theme");

  useEffect(() => {
    if (!themeData) {
      setThemeData("light");
    }
  }, [themeData, setThemeData]);

  const toggleTheme = () => {
    setThemeData(themeData === "light" ? "dark" : "light");
  };

  const value = {
    themeData,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };
