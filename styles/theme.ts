export const themes = {
  light: {
    foreground: "#333D4B",
    background: "#FFFFFF",
    primary: "#3D6FE7",
    secondary: "#4C80F1",
    accent: "#2E5ED3",
    muted: "#F2F4F6",
    border: "#E5E8EB",
    card: "#FFFFFF",
    text: "#333D4B",
  },
  dark: {
    foreground: "#F9FAFB",
    background: "#1A1A1A",
    primary: "#4C80F1",
    secondary: "#3D6FE7",
    accent: "#2E5ED3",
    muted: "#333D4B",
    border: "#4E5968",
    card: "#2A2A2A",
    text: "#F9FAFB",
  },
} as const;

export type TTheme = typeof themes.light | typeof themes.dark;
export type TThemeType = keyof typeof themes;
