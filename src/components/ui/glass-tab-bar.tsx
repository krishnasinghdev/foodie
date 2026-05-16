import { Pressable, View } from "react-native";

import { GlassContainer, GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import type { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs/types";

import { useTheme } from "@/components/theme-provider";
import { TabBarIcon, type TabIconName } from "@/components/ui/tab-bar-icon";
import { ThemedText } from "@/components/ui/themed-text";
import { cn } from "@/lib/cn";
import { useIsDark, useThemeColor } from "@/lib/theme";

const ICONS: Record<string, TabIconName> = {
  "(home)": "home",
  search: "search",
  orders: "orders",
  profile: "profile",
};

/** Route names that float out of the main pill as their own circular bubble. */
const FLOATING: ReadonlySet<string> = new Set(["search"]);

export function GlassTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  const isDark = useIsDark();
  const { scheme } = useTheme();
  const primary = useThemeColor("primary");
  const onSurface = useThemeColor("on-surface");
  const onSurfaceVariant = useThemeColor("on-surface-variant");
  // Material 3 active-indicator colors — pulled directly so we can tint the SF Symbol
  const onPrimaryContainer = scheme === "dark" ? "#390c00" : "#5f1900";

  const liquidGlass = isLiquidGlassAvailable();

  const pillRoutes = state.routes.filter((r) => !FLOATING.has(r.name));
  const floatingRoutes = state.routes.filter((r) => FLOATING.has(r.name));

  const onPress = (routeKey: string, routeName: string, isFocused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: routeKey,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName, undefined);
    }
  };

  return (
    <View
      pointerEvents="box-none"
      style={{ paddingBottom: insets.bottom + 6 }}
      className="absolute inset-x-0 bottom-0 px-md"
    >
      <GlassContainer spacing={28} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {/* Main pill */}
        <GlassWrap
          liquidGlass={liquidGlass}
          isDark={isDark}
          className="flex-1 flex-row items-center overflow-hidden rounded-full px-1.5 py-1.5"
        >
          {pillRoutes.map((route) => {
            const { options } = descriptors[route.key];
            const isFocused = state.routes[state.index]?.key === route.key;
            const label =
              typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : (options.title ?? route.name);
            const icon = ICONS[route.name] ?? "home";
            const iconTint = isFocused ? onPrimaryContainer : onSurfaceVariant;
            const labelTint = isFocused ? onSurface : onSurfaceVariant;

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={() => onPress(route.key, route.name, isFocused)}
                className="flex-1 items-center"
              >
                {/* M3 active indicator: 56×32 pill in primary-container */}
                <View
                  style={{ borderRadius: 999, height: 32, width: 56 }}
                  className={cn(
                    "items-center justify-center",
                    isFocused && "bg-primary-container rounded-full",
                  )}
                >
                  <TabBarIcon name={icon} color={iconTint} focused={isFocused} size={20} />
                </View>
                <ThemedText
                  variant="label-sm"
                  style={{
                    color: labelTint,
                    fontSize: 10,
                    lineHeight: 12,
                    marginTop: 2,
                    fontFamily: isFocused ? "Inter_600SemiBold" : "Inter_500Medium",
                  }}
                >
                  {label}
                </ThemedText>
              </Pressable>
            );
          })}
        </GlassWrap>

        {/* Floating circle(s) */}
        {floatingRoutes.map((route) => {
          const isFocused = state.routes[state.index]?.key === route.key;
          const icon = ICONS[route.name] ?? "search";
          return (
            <GlassWrap
              key={route.key}
              liquidGlass={liquidGlass}
              isDark={isDark}
              className="h-16 w-16 items-center justify-center overflow-hidden rounded-full"
            >
              <Pressable
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={() => onPress(route.key, route.name, isFocused)}
                className="h-full w-full items-center justify-center"
              >
                <TabBarIcon
                  name={icon}
                  color={isFocused ? primary : onSurface}
                  focused={isFocused}
                  size={20}
                />
              </Pressable>
            </GlassWrap>
          );
        })}
      </GlassContainer>
    </View>
  );
}

function GlassWrap({
  liquidGlass,
  isDark,
  className,
  children,
}: {
  liquidGlass: boolean;
  isDark: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (liquidGlass) {
    return (
      <GlassView
        glassEffectStyle="regular"
        colorScheme={isDark ? "dark" : "light"}
        className={className}
      >
        {children}
      </GlassView>
    );
  }
  return (
    <View
      className={cn("bg-surface-container-high/90 border border-outline-variant/30", className)}
    >
      {children}
    </View>
  );
}
