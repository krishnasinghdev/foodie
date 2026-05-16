import { ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";
import { Link } from "expo-router";

export default function SearchScreen() {
  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-lg px-container-margin pb-32 pt-lg">
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            Search
          </ThemedText>
          <ThemedText tone="on-surface-variant">
            Search restaurants, dishes, and cuisines.
          </ThemedText>
        </View>

        <View className="rounded-lg bg-surface-container p-lg">
          <ThemedText variant="headline-md">Popular result</ThemedText>
          <ThemedText className="mt-xs" tone="on-surface-variant">
            Urban Pizza - Pizza and sides
          </ThemedText>
          <Link href="/restaurant/urban-pizza" className="mt-sm text-primary underline">
            Open Urban Pizza
          </Link>
        </View>

        <Link href="/cart" className="text-primary underline">
          Go to Cart
        </Link>
      </ScrollView>
    </Screen>
  );
}
