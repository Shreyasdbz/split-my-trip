/** @format */

import React, { useState, createContext } from "react";

import { styles, ThemeType } from "../styles/theme";

type ThemeContextProviderProps = {
  children: React.ReactElement;
};

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(styles.light);

  function toggleTheme() {
    if (theme === styles.light) {
      setTheme(styles.dark);
    } else if (theme === styles.dark) {
      setTheme(styles.light);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
