import { FlatList, KeyboardAvoidingView, Platform, Pressable, TextInput, View } from "react-native";

import { useMemo, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";

import { restaurants } from "@/lib/data";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) return [];

    return restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(trimmed) ||
        restaurant.meta.toLowerCase().includes(trimmed),
    );
  }, [query]);

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        {/* Sticky Header */}
        <View className="px-container-margin pt-lg pb-md bg-background border-b border-outline/10">
          <View className="gap-xs mb-md">
            <ThemedText variant="display-lg">Discover Food</ThemedText>

            <ThemedText tone="on-surface-variant">
              Search restaurants, cuisines, or dishes.
            </ThemedText>
          </View>

          <View className="flex-row items-center rounded-2xl bg-surface-container px-sm py-xs">
            <Ionicons name="search" size={20} color="#999" />

            <TextInput
              placeholder="Search pizza, sushi..."
              placeholderTextColor="#999"
              className="flex-1 text-on-surface"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />

            {query.length > 0 && (
              <Pressable onPress={() => setQuery("")} hitSlop={10}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Results */}
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-container-margin py-sm"
          ListEmptyComponent={
            query.length > 0 ? (
              <ThemedView
                surface="container-low"
                radius="xl"
                className="items-center p-xl gap-sm mt-lg"
              >
                <ThemedText variant="headline-lg">No results found</ThemedText>

                <ThemedText tone="on-surface-variant" className="text-center">
                  Try another keyword.
                </ThemedText>
              </ThemedView>
            ) : (
              <View className="mt-sm gap-sm">
                <ThemedText variant="label-md">Popular searches</ThemedText>

                <View className="flex-row flex-wrap gap-sm">
                  {["Pizza", "Burger", "Sushi"].map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => setQuery(item)}
                      className="bg-secondary-container rounded-full px-sm py-xs"
                    >
                      <ThemedText>{item}</ThemedText>
                    </Pressable>
                  ))}
                </View>
              </View>
            )
          }
          renderItem={({ item }) => (
            <Link href={`/restaurant/${item.id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <ThemedView
                    surface="container-lowest"
                    radius="xl"
                    elevation="sm"
                    className={`flex-row items-center gap-md p-md mb-md ${
                      pressed ? "opacity-80" : ""
                    }`}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 84,
                        height: 84,
                        borderRadius: 14,
                      }}
                      contentFit="cover"
                    />

                    <View className="flex-1 gap-xs">
                      <ThemedText variant="headline-md">{item.name}</ThemedText>

                      <ThemedText tone="on-surface-variant" numberOfLines={2}>
                        {item.meta}
                      </ThemedText>
                    </View>

                    <Ionicons name="chevron-forward" size={18} color="#999" />
                  </ThemedView>
                )}
              </Pressable>
            </Link>
          )}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
}
