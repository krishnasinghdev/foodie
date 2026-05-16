import { ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";
import { Link } from "expo-router";

export default function ProfileScreen() {
  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-lg px-container-margin pb-32 pt-lg">
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            Profile
          </ThemedText>
          <ThemedText tone="on-surface-variant">
            Demo customer profile with drawer shortcuts.
          </ThemedText>
        </View>

        <View className="gap-sm rounded-lg bg-surface-container p-lg">
          <ThemedText variant="headline-md">Krishna Singh</ThemedText>
          <ThemedText tone="on-surface-variant">Rewards member - 420 points</ThemedText>
        </View>

        <View className="gap-sm">
          <Link href="/settings" className="text-primary underline">
            Open Settings
          </Link>
          <Link href="/help" className="text-primary underline">
            Open Help
          </Link>
          <Link href="/logout" className="text-primary underline">
            Open Logout
          </Link>
        </View>
      </ScrollView>
    </Screen>
  );
}
