import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";
import { cn } from "@/lib/cn";
import { restaurants } from "@/lib/data";
import { Image } from "expo-image";

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ThemedText variant="headline-md" tone="error">
            Restaurant not found
          </ThemedText>
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={["left", "right"]}>
      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32">
          <View className="relative">
            <Image
              source={{ uri: restaurant.image }}
              style={{ width: "100%", height: 280 }}
              contentFit="cover"
            />

            {/* Dark overlay */}
            <View className="absolute inset-0 bg-black/30" />

            {/* Restaurant info overlay */}
            <View className="absolute bottom-0 left-0 bg-secondary-container/30 right-0 gap-sm p-md">
              <ThemedText variant="headline-md" tone="on-surface">
                {restaurant.name}
              </ThemedText>

              <View className="flex-row items-center gap-sm">
                <View className="rounded-full bg-primary px-sm py-1">
                  <ThemedText variant="label-sm" tone="on-surface">
                    ⭐ {restaurant.rating}
                  </ThemedText>
                </View>

                <ThemedText tone="on-surface">{restaurant.meta}</ThemedText>
              </View>
            </View>
          </View>

          {/* Content */}
          <View className="gap-xl px-container-margin py-xl">
            {/* Cuisine Tags */}
            <View className="flex-row flex-wrap gap-sm">
              {restaurant.cuisines.map((cuisine) => (
                <View key={cuisine} className="rounded-full bg-surface-container-high px-md py-xs">
                  <ThemedText variant="label-sm" tone="primary">
                    {cuisine}
                  </ThemedText>
                </View>
              ))}
            </View>

            {/* Section Header */}
            <View className="gap-xs">
              <ThemedText variant="headline-lg">Recommended Dishes</ThemedText>

              <ThemedText tone="on-surface-variant">
                Freshly prepared with premium ingredients
              </ThemedText>
            </View>

            {/* Menu List */}
            <View className="gap-md">
              {restaurant.menu.map((item) => (
                <Pressable
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-surface-container active:opacity-90"
                >
                  <View className="flex-row items-center">
                    {/* Food Image */}
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 120,
                        height: 160,
                        borderRadius: 10,
                        margin: 4,
                      }}
                      contentFit="cover"
                    />

                    {/* Content */}
                    <View className="flex-1 justify-between p-sm">
                      <View className="gap-xs">
                        <View className="flex-row items-center gap-xs">
                          <View
                            className={cn(
                              "h-3 w-3 rounded-full",
                              item.isVeg ? "bg-green-500" : "bg-red-500",
                            )}
                          />

                          <ThemedText variant="headline-md" tone="primary">
                            {item.title}
                          </ThemedText>
                        </View>

                        <ThemedText variant="body-md" tone="on-surface-variant" numberOfLines={2}>
                          {item.description}
                        </ThemedText>

                        <ThemedText variant="label-sm" tone="secondary">
                          {item.serving}
                        </ThemedText>
                      </View>

                      {/* Footer */}
                      <View className="flex-row items-center justify-between pt-sm">
                        <ThemedText variant="headline-lg">₹{item.price}</ThemedText>

                        <Pressable className="rounded-full bg-primary px-3 py-1">
                          <ThemedText variant="label-md" tone="on-primary">
                            Add +
                          </ThemedText>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
