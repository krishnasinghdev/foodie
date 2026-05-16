import { router } from "expo-router";
import { Pressable, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";

export default function LogoutScreen() {
  return (
    <Screen>
      <View className="flex-1 justify-center gap-lg px-container-margin">
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            Logout
          </ThemedText>
          <ThemedText tone="on-surface-variant">
            Demo logout route. Confirming returns to onboarding.
          </ThemedText>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace("/onboarding")}
          className="items-center rounded-full bg-primary px-lg py-md"
        >
          <ThemedText variant="label-md" tone="on-primary">
            Logout
          </ThemedText>
        </Pressable>
      </View>
    </Screen>
  );
}
