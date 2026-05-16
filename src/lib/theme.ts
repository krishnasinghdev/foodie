import { useTheme } from "@/components/theme-provider";

type Tone =
  | "primary"
  | "on-primary"
  | "on-surface"
  | "on-surface-variant"
  | "error"
  | "background"
  | "surface"
  | "secondary"
  | "tertiary";

const LIGHT: Record<Tone, string> = {
  primary: "#ab3500",
  "on-primary": "#ffffff",
  "on-surface": "#161d1f",
  "on-surface-variant": "#594139",
  error: "#ba1a1a",
  background: "#f4fafd",
  surface: "#f4fafd",
  secondary: "#546259",
  tertiary: "#006c51",
};

const DARK: Record<Tone, string> = {
  primary: "#ffb59d",
  "on-primary": "#5f1900",
  "on-surface": "#dde4e6",
  "on-surface-variant": "#e1bfb5",
  error: "#ffb4ab",
  background: "#0e1416",
  surface: "#0e1416",
  secondary: "#bbcac0",
  tertiary: "#38dfae",
};

/**
 * Resolve a theme color to a literal hex for APIs that don't accept className
 * (e.g. ActivityIndicator.color, StatusBar.style, vector icons).
 *
 * Reads the resolved scheme from <ThemeProvider> so it tracks both system and
 * user overrides. Keep this list in sync with global.css.
 */
export function useThemeColor(tone: Tone): string {
  const { scheme } = useTheme();
  return (scheme === "dark" ? DARK : LIGHT)[tone];
}

export function useIsDark(): boolean {
  return useTheme().scheme === "dark";
}
