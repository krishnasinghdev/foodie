import { Link, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const title = formatRestaurantName(id);

  return (
    <Screen edges={["left", "right"]}>
      <ScrollView contentContainerClassName="gap-lg px-container-margin pb-32 pt-lg">
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            {title}
          </ThemedText>
          <ThemedText tone="on-surface-variant">
            Demo restaurant detail with featured dishes and cart navigation.
          </ThemedText>
        </View>

        {["Paneer tikka bowl", "Masala fries", "Mango lassi"].map((item, index) => (
          <View key={item} className="rounded-lg bg-surface-container p-lg">
            <ThemedText variant="headline-md">{item}</ThemedText>
            <ThemedText className="mt-xs" tone="on-surface-variant">
              Rs. {199 + index * 60} - Tap checkout below to continue.
            </ThemedText>
          </View>
        ))}

        <Link href="/cart" className="rounded-full bg-primary px-lg py-md">
          <ThemedText variant="label-md" tone="on-primary" align="center">
            Add items and view cart
          </ThemedText>
        </Link>
      </ScrollView>
    </Screen>
  );
}

function formatRestaurantName(id?: string) {
  if (!id) return "Restaurant Detail";

  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
