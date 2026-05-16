import { Pressable, View } from "react-native";

import { useTheme, type ThemePreference } from "@/components/theme-provider";
import { ThemedText } from "@/components/ui/themed-text";
import { cn } from "@/lib/cn";

const OPTIONS: Array<{ value: ThemePreference; label: string }> = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];

export function ThemeToggle({ className }: { className?: string }) {
  const { preference, setPreference } = useTheme();

  return (
    <View
      className={cn(
        "bg-surface-container-high rounded-full flex-row items-center p-1",
        className,
      )}
    >
      {OPTIONS.map((opt) => {
        const active = preference === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => setPreference(opt.value)}
            className={cn(
              "rounded-full px-md py-xs active:opacity-80",
              active && "bg-primary",
            )}
          >
            <ThemedText
              variant="label-md"
              className={active ? "text-on-primary" : "text-on-surface-variant"}
            >
              {opt.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}
