import { StyleSheet, View } from "react-native";

import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

import { useIsDark } from "@/lib/theme";

/**
 * Background for the bottom tab bar.
 *
 * iOS 26+ (where liquid glass is available) → translucent `<GlassView>` that
 * blurs whatever content scrolls beneath the bar.
 *
 * Older iOS / Android → falls back to a solid themed surface so the bar still
 * looks intentional.
 */
export function TabBarBackground() {
  const isDark = useIsDark();

  if (isLiquidGlassAvailable()) {
    return (
      <GlassView
        style={StyleSheet.absoluteFill}
        glassEffectStyle="regular"
        colorScheme={isDark ? "dark" : "light"}
      />
    );
  }

  return (
    <View
      style={StyleSheet.absoluteFill}
      className="bg-surface-container-high border-t border-outline-variant/40"
    />
  );
}
