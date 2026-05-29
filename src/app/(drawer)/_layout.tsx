import { Drawer } from "expo-router/drawer";

import { useThemeColor } from "@/lib/theme";

export default function DrawerLayout() {
  const background = useThemeColor("background");
  const surface = useThemeColor("surface");
  const primary = useThemeColor("primary");
  const onSurfaceVariant = useThemeColor("on-surface-variant");

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: primary,
        drawerInactiveTintColor: onSurfaceVariant,
        drawerLabelStyle: { fontFamily: "Inter_600SemiBold" },
        drawerStyle: { backgroundColor: surface },
        sceneStyle: { backgroundColor: background },
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ title: "Foddie", headerShown: false }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
      <Drawer.Screen name="help" options={{ title: "Help" }} />
      <Drawer.Screen name="logout" options={{ title: "Logout" }} />
    </Drawer>
  );
}
