import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { colorScheme as nativewindColorScheme } from "react-native-css";

export type ThemePreference = "light" | "dark" | "auto";
export type ResolvedScheme = "light" | "dark";

type ThemeContextValue = {
  /** User's chosen mode — light, dark, or auto (follow system) */
  preference: ThemePreference;
  setPreference: (next: ThemePreference) => void;
  /** Concrete scheme actually in effect right now */
  scheme: ResolvedScheme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Drives the app's color scheme by writing directly to react-native-css's
 * internal colorScheme observable. That observable backs the
 * `@media (prefers-color-scheme: dark)` block in global.css, so flipping it
 * cascades to every NativeWind utility.
 *
 * We avoid `Appearance.setColorScheme(...)` because passing null crashes the
 * Android AppearanceModule on some RN versions. The system scheme is read via
 * RN's `useColorScheme()` and fed into the observable for "auto" mode.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>("auto");

  const scheme: ResolvedScheme =
    preference === "auto" && systemScheme !== "dark"
      ? "light"
      : preference === "auto"
        ? "dark"
        : preference;

  useEffect(() => {
    nativewindColorScheme.set(scheme);
  }, [scheme]);

  return (
    <ThemeContext.Provider value={{ preference, setPreference, scheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
