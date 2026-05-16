import { Stack } from "expo-router";

import { useThemeColor } from "@/lib/theme";

export default function RestaurantStackLayout() {
  const background = useThemeColor("background");
  const onSurface = useThemeColor("on-surface");

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: background },
        headerShadowVisible: false,
        headerStyle: { backgroundColor: background },
        headerTintColor: onSurface,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home Feed", headerShown: false }} />
      <Stack.Screen name="restaurant/[id]" options={{ title: "Restaurant Detail" }} />
      <Stack.Screen name="cart" options={{ title: "Cart" }} />
    </Stack>
  );
}
