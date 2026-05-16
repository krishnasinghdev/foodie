import { router } from "expo-router";
import { Pressable, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";

export default function OnboardingScreen() {
  return (
    <Screen surface="container-lowest">
      <View className="flex-1 justify-between px-container-margin py-xl">
        <View className="gap-md pt-xl">
          <ThemedText variant="display-lg" tone="primary">
            Recurly Eats
          </ThemedText>
          <ThemedText variant="body-lg" tone="on-surface-variant">
            Fresh meals, quick checkout, and live order tracking in one demo food ordering app.
          </ThemedText>
        </View>

        <View className="gap-md">
          <View className="rounded-lg bg-surface-container p-lg">
            <ThemedText variant="headline-md">Your food route is ready</ThemedText>
            <ThemedText className="mt-sm" tone="on-surface-variant">
              Continue to browse restaurants, search dishes, open the cart, and visit drawer pages.
            </ThemedText>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace("/")}
            className="items-center rounded-full bg-primary px-lg py-md"
          >
            <ThemedText variant="label-md" tone="on-primary">
              Start ordering
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
