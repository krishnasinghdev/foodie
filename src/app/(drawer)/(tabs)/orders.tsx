import { Link } from "expo-router";
import { ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";

export default function OrdersScreen() {
  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-lg px-container-margin pb-32 pt-lg">
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            Orders
          </ThemedText>
          <ThemedText tone="on-surface-variant">Track active and past food orders.</ThemedText>
        </View>

        <View className="rounded-lg bg-surface-container p-lg">
          <ThemedText variant="headline-md">Order #1024</ThemedText>
          <ThemedText className="mt-xs" tone="on-surface-variant">
            Spice Kitchen - Preparing - ETA 22 min
          </ThemedText>
        </View>

        <Link href="/my-orders" className="text-primary underline">
          Open My Orders drawer screen
        </Link>
      </ScrollView>
    </Screen>
  );
}
