import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";
import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import { cn } from "@/lib/cn";
import { useIsDark } from "@/lib/theme";

const screenVariants = cva("flex-1", {
  variants: {
    surface: {
      background: "bg-background",
      surface: "bg-surface",
      "container-lowest": "bg-surface-container-lowest",
      "container-low": "bg-surface-container-low",
      container: "bg-surface-container",
      "container-high": "bg-surface-container-high",
      inverse: "bg-inverse-surface",
    },
  },
  defaultVariants: {
    surface: "background",
  },
});

export type ScreenEdge = "top" | "bottom" | "left" | "right";

export type ScreenProps = ViewProps &
  VariantProps<typeof screenVariants> & {
    children: ReactNode;
    className?: string;
    /** Hide the status bar component (e.g. when a nav header already manages it) */
    hideStatusBar?: boolean;
    /**
     * Which safe-area edges to pad. Defaults to top/left/right — bottom is
     * usually consumed by a tab bar or keyboard inset.
     */
    edges?: ScreenEdge[];
  };

/**
 * Root wrapper for every screen.
 *
 * We apply safe-area insets via `useSafeAreaInsets()` + manual padding rather
 * than `<SafeAreaView>` because react-native-css wraps that component, and the
 * wrapper interferes with NativeWind utilities + theme-change reactivity.
 */
export function Screen({
  surface,
  className,
  children,
  hideStatusBar,
  edges = ["top", "left", "right"],
  style,
  ...rest
}: ScreenProps) {
  const isDark = useIsDark();
  const insets = useSafeAreaInsets();

  const padding = {
    paddingTop: edges.includes("top") ? insets.top : 0,
    paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
    paddingLeft: edges.includes("left") ? insets.left : 0,
    paddingRight: edges.includes("right") ? insets.right : 0,
  };

  return (
    <View className={cn(screenVariants({ surface }), className)} style={[padding, style]} {...rest}>
      {!hideStatusBar && <StatusBar style={isDark ? "light" : "dark"} />}
      {children}
    </View>
  );
}
