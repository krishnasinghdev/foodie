import { Tabs } from "expo-router";

import { GlassTabBar } from "@/components/ui/glass-tab-bar";
import { useThemeColor } from "@/lib/theme";

export default function TabLayout() {
  const background = useThemeColor("background");

  return (
    <Tabs
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: background },
      }}
    >
      <Tabs.Screen name="(home)" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="orders" options={{ title: "Orders" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
