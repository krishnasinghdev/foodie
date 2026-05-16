import { Link } from "expo-router";
import { ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";

export default function CartScreen() {
  return (
    <Screen edges={["left", "right"]}>
      <ScrollView contentContainerClassName="gap-lg px-container-margin pb-32 pt-lg">
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            Cart
          </ThemedText>
          <ThemedText tone="on-surface-variant">
            Review demo items before placing the order.
          </ThemedText>
        </View>

        <View className="gap-sm rounded-lg bg-surface-container p-lg">
          <ThemedText variant="headline-md">Paneer tikka bowl</ThemedText>
          <ThemedText tone="on-surface-variant">Qty 1 - Rs. 199</ThemedText>
          <ThemedText variant="headline-md">Masala fries</ThemedText>
          <ThemedText tone="on-surface-variant">Qty 1 - Rs. 259</ThemedText>
        </View>

        <View className="gap-sm">
          <ThemedText variant="headline-md">Total: Rs. 458</ThemedText>
          <Link href="/orders" className="rounded-full bg-primary px-lg py-md">
            <ThemedText variant="label-md" tone="on-primary" align="center">
              Place order
            </ThemedText>
          </Link>
          <Link href="/" className="text-primary underline">
            Back to Home Feed
          </Link>
        </View>
      </ScrollView>
    </Screen>
  );
}
