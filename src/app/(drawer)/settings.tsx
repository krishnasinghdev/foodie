import { Link } from "expo-router";
import { View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemedText } from "@/components/ui/themed-text";

export default function SettingsScreen() {
  return (
    <Screen>
      <View className="flex-1 gap-lg px-container-margin py-lg">
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            Settings
          </ThemedText>
          <ThemedText tone="on-surface-variant">Demo preferences for the food app.</ThemedText>
        </View>
        <View className="rounded-lg bg-surface-container p-lg">
          <ThemeToggle />
        </View>
        <Link href="/" className="text-primary underline">
          Back to Main App
        </Link>
      </View>
    </Screen>
  );
}
