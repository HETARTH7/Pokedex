// AppContext.js
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const getThemeColors = () => {
    return theme === "light"
      ? {
          backgroundColor: "#ffffff",
          textColor: "#000000",
        }
      : {
          backgroundColor: "#000000",
          textColor: "#ffffff",
        };
  };

  const contextValue = {
    theme,
    toggleTheme,
    getThemeColors,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
