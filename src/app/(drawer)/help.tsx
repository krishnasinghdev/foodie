import { Link } from "expo-router";
import { View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";

export default function HelpScreen() {
  return (
    <Screen>
      <View className="flex-1 gap-lg px-container-margin py-lg">
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            Help
          </ThemedText>
          <ThemedText tone="on-surface-variant">
            Contact support, report delivery issues, or read FAQs.
          </ThemedText>
        </View>
        <View className="rounded-lg bg-surface-container p-lg">
          <ThemedText variant="headline-md">Support</ThemedText>
          <ThemedText className="mt-xs" tone="on-surface-variant">
            Chat support and refund flows can be added here.
          </ThemedText>
        </View>
        <Link href="/" className="text-primary underline">
          Back to Main App
        </Link>
      </View>
    </Screen>
  );
}
