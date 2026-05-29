import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { restaurants } from "@/lib/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { ScrollView, View } from "react-native";

export default function HomeFeedScreen() {
  return (
    <Screen className="gap-lg ">
      <ScrollView
        contentContainerClassName="gap-lg px-container-margin pb-32 pt-sm"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-xs p-2">
          <ThemedText variant="display-lg" tone="primary" className="text-xl">
            <Ionicons name="fast-food-outline" size={30} color="black bg-primary-container" />
            Foodie
          </ThemedText>
          <ThemedText tone="on-surface-variant">Pick a restaurant, search dishes.</ThemedText>
        </View>

        {restaurants.map((restaurant) => (
          <ThemedView
            surface="container-lowest"
            radius="lg"
            elevation="sm"
            className="overflow-hidden"
            key={restaurant.id}
          >
            <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
              <Image
                source={{ uri: restaurant.image }}
                style={{ width: 400, height: 150 }}
                contentFit="cover"
              />
              <View className="gap-xs p-md">
                <View className="flex-row items-center gap-sm">
                  <View className="bg-secondary-container rounded-full px-sm py-1">
                    <ThemedText variant="label-sm" tone="on-secondary-container">
                      Vegan
                    </ThemedText>
                  </View>
                  <View className="bg-tertiary-container rounded-full px-sm py-1">
                    <ThemedText variant="label-sm" tone="on-tertiary-container">
                      Fastest
                    </ThemedText>
                  </View>
                </View>
                <ThemedText variant="headline-md" tone="on-surface">
                  {restaurant.name}
                </ThemedText>
                <ThemedText variant="body-md" tone="on-surface-variant">
                  {restaurant.meta}
                </ThemedText>
                {/* <View className="mt-sm flex-row items-center justify-between">
                    <ThemedText variant="headline-md" tone="primary">
                      $12.50
                    </ThemedText>
                    <Pressable className="bg-primary h-12 w-12 items-center justify-center rounded-full active:opacity-80">
                      <ThemedText variant="headline-md" tone="on-primary">
                        +
                      </ThemedText>
                    </Pressable>
                  </View> */}
              </View>
            </Link>
          </ThemedView>
        ))}
        <ThemedText tone="on-surface-variant" className="text-center">
          Made with 🩵
        </ThemedText>
      </ScrollView>
    </Screen>
  );
}
