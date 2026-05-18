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
        <View className="gap-sm">
          <Link href="/cart" className="rounded-full bg-primary px-lg py-md text-center">
            <ThemedText variant="label-md" tone="on-primary" align="center">
              Open Cart
            </ThemedText>
          </Link>
          <Link href="/search" className="text-primary underline">
            <ThemedText variant="label-md" tone="primary">
              Go to Search tab
            </ThemedText>
          </Link>
          <Link href="/my-orders" className="text-primary underline">
            <ThemedText>Open My Orders drawer screen</ThemedText>
          </Link>
          <Link href="/showcase" className="text-primary underline">
            <ThemedText>Open Showcase screen</ThemedText>
          </Link>
          <Link href="/onboarding" className="text-primary underline">
            <ThemedText>Open Onboarding screen</ThemedText>
          </Link>
        </View>
      </ScrollView>
    </Screen>
  );
}
