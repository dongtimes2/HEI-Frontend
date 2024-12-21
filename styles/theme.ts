export const themes = {
  light: {
    foreground: "#333333",
    background: "#FFFFFF",
    primary: "#FF1493",
    secondary: "#FF69B4",
    accent: "#FF00FF",
    muted: "#F0F0F0",
    border: "#E0E0E0",
    card: "#FFFFFF",
  },
  dark: {
    foreground: "#E0E0E0",
    background: "#1A1A1A",
    primary: "#FF69B4",
    secondary: "#FF1493",
    accent: "#FF00FF",
    muted: "#2A2A2A",
    border: "#3A3A3A",
    card: "#2A2A2A",
  },
} as const;

export type TTheme = typeof themes.light | typeof themes.dark;
export type TThemeType = keyof typeof themes;
