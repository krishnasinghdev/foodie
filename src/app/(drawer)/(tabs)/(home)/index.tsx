import { Link } from "expo-router";
import { ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";

const restaurants = [
  { id: "spice-kitchen", name: "Spice Kitchen", meta: "North Indian - 25 min" },
  { id: "green-bowl", name: "Green Bowl", meta: "Healthy bowls - 18 min" },
  { id: "urban-pizza", name: "Urban Pizza", meta: "Pizza and sides - 30 min" },
];

export default function HomeFeedScreen() {
  return (
    <Screen>
      <ScrollView
        contentContainerClassName="gap-lg px-container-margin pb-32 pt-lg"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            Home Feed
          </ThemedText>
          <ThemedText tone="on-surface-variant">
            Pick a restaurant, search dishes, or open your cart.
          </ThemedText>
        </View>

        <View className="gap-sm">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurant/${restaurant.id}`}
              className="rounded-lg bg-surface-container p-lg"
            >
              <View className="gap-xs">
                <ThemedText variant="headline-md">{restaurant.name}</ThemedText>
                <ThemedText tone="on-surface-variant">{restaurant.meta}</ThemedText>
                <ThemedText variant="label-md" tone="primary">
                  View menu
                </ThemedText>
              </View>
            </Link>
          ))}
        </View>

        <View className="gap-sm">
          <Link href="/cart" className="rounded-full bg-primary px-lg py-md text-center">
            <ThemedText variant="label-md" tone="on-primary" align="center">
              Open Cart
            </ThemedText>
          </Link>
          <Link href="/search" className="text-primary underline">
            Go to Search tab
          </Link>
          <Link href="/my-orders" className="text-primary underline">
            Open My Orders drawer screen
          </Link>
        </View>
      </ScrollView>
    </Screen>
  );
}
