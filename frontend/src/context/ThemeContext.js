import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const { children } = props;

  const initialTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(initialTheme);

  console.log("ThemeContextProvider - theme", theme);

  const textStyle = {
    textDecoration: "none",
    color: theme === "light" ? "black" : "white",
  };
  const backgroundStyle = {
    backgroundColor: theme === "light" ? "white" : "black",
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        theme,
        textStyle,
        backgroundStyle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
