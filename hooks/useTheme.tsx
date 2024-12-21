import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { themes, TTheme, TThemeType } from "@styles/theme";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<TTheme>(themes[colorScheme === "dark" ? "dark" : "light"]);
  const [themeType, setThemeType] = useState<TThemeType>(colorScheme === "dark" ? "dark" : "light");

  useEffect(() => {
    setTheme(themes[colorScheme === "dark" ? "dark" : "light"]);
    setThemeType(colorScheme === "dark" ? "dark" : "light");
  }, [colorScheme]);

  return { theme, themeType };
};
