import { Link } from "expo-router";
import { ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";

export default function MyOrdersScreen() {
  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-lg px-container-margin pb-lg pt-lg">
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            My Orders
          </ThemedText>
          <ThemedText tone="on-surface-variant">
            Drawer destination for all order history.
          </ThemedText>
        </View>
        <View className="rounded-lg bg-surface-container p-lg">
          <ThemedText variant="headline-md">Last delivery</ThemedText>
          <ThemedText className="mt-xs" tone="on-surface-variant">
            Green Bowl - Delivered yesterday
          </ThemedText>
        </View>
        <Link href="/" className="text-primary underline">
          Back to Main App
        </Link>
      </ScrollView>
    </Screen>
  );
}
