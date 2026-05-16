import { Pressable, ScrollView, View } from "react-native";

import { ThemeToggle } from "@/components/theme-toggle";
import { Screen } from "@/components/ui/screen";
import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";

const TYPOGRAPHY = [
  "display-lg",
  "headline-lg",
  "headline-lg-mobile",
  "headline-md",
  "body-lg",
  "body-md",
  "label-md",
  "label-sm",
] as const;

const SURFACES = [
  "container-lowest",
  "container-low",
  "container",
  "container-high",
  "container-highest",
  "surface-dim",
  "inverse",
] as const;

const SEMANTIC_PAIRS: Array<{ name: string; bg: string; fg: string }> = [
  { name: "Primary", bg: "bg-primary", fg: "text-on-primary" },
  { name: "Primary container", bg: "bg-primary-container", fg: "text-on-primary-container" },
  { name: "Secondary", bg: "bg-secondary", fg: "text-on-secondary" },
  { name: "Secondary container", bg: "bg-secondary-container", fg: "text-on-secondary-container" },
  { name: "Tertiary", bg: "bg-tertiary", fg: "text-on-tertiary" },
  { name: "Tertiary container", bg: "bg-tertiary-container", fg: "text-on-tertiary-container" },
  { name: "Error", bg: "bg-error", fg: "text-on-error" },
  { name: "Error container", bg: "bg-error-container", fg: "text-on-error-container" },
];

const RADII = ["sm", "md", "lg", "xl", "full"] as const;
const SPACING = ["xs", "sm", "md", "lg", "xl"] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-md">
      <ThemedText variant="headline-md" tone="on-surface">
        {title}
      </ThemedText>
      {children}
    </View>
  );
}

export default function Index() {
  return (
    <Screen>
      <ScrollView
        contentContainerClassName="gap-xl px-container-margin py-lg"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-md">
          <View className="gap-xs">
            <ThemedText variant="display-lg" tone="primary">
              Modern Appetite
            </ThemedText>
            <ThemedText variant="body-md" tone="on-surface-variant">
              Design system showcase
            </ThemedText>
          </View>
          <ThemeToggle className="self-start" />
        </View>

        <Section title="Typography">
          <ThemedView surface="container-lowest" radius="lg" pad="md" className="gap-sm">
            {TYPOGRAPHY.map((v) => (
              <View key={v} className="gap-xs">
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  text-{v}
                </ThemedText>
                <ThemedText variant={v} tone="on-surface">
                  The quick brown fox
                </ThemedText>
              </View>
            ))}
          </ThemedView>
        </Section>

        <Section title="Font families">
          <ThemedView surface="container-lowest" radius="lg" pad="md" className="gap-md">
            <View className="gap-xs">
              <ThemedText variant="label-sm" tone="on-surface-variant">
                Inter (default body)
              </ThemedText>
              <ThemedText variant="body-md" className="font-inter">
                Regular — The quick brown fox
              </ThemedText>
              <ThemedText variant="body-md" className="font-inter-medium">
                Medium — The quick brown fox
              </ThemedText>
              <ThemedText variant="body-md" className="font-inter-semibold">
                SemiBold — The quick brown fox
              </ThemedText>
              <ThemedText variant="body-md" className="font-inter-bold">
                Bold — The quick brown fox
              </ThemedText>
              <ThemedText variant="body-md" className="font-inter-extrabold">
                ExtraBold — The quick brown fox
              </ThemedText>
            </View>

            <View className="gap-xs">
              <ThemedText variant="label-sm" tone="on-surface-variant">
                Manrope
              </ThemedText>
              <ThemedText variant="body-md" className="font-manrope">
                Regular — The quick brown fox
              </ThemedText>
              <ThemedText variant="body-md" className="font-manrope-medium">
                Medium — The quick brown fox
              </ThemedText>
              <ThemedText variant="body-md" className="font-manrope-semibold">
                SemiBold — The quick brown fox
              </ThemedText>
              <ThemedText variant="body-md" className="font-manrope-bold">
                Bold — The quick brown fox
              </ThemedText>
              <ThemedText variant="body-md" className="font-manrope-extrabold">
                ExtraBold — The quick brown fox
              </ThemedText>
            </View>

            <View className="gap-xs">
              <ThemedText variant="label-sm" tone="on-surface-variant">
                Playfair Display (serif / display)
              </ThemedText>
              <ThemedText variant="headline-md" className="font-playfair">
                Regular — The quick brown fox
              </ThemedText>
              <ThemedText variant="headline-md" className="font-playfair-bold">
                Bold — The quick brown fox
              </ThemedText>
              <ThemedText variant="headline-md" className="font-playfair-black">
                Black — The quick brown fox
              </ThemedText>
            </View>
          </ThemedView>
        </Section>

        <Section title="Semantic colors">
          <View className="gap-sm">
            {SEMANTIC_PAIRS.map((p) => (
              <View key={p.name} className={`${p.bg} rounded-lg p-md`}>
                <ThemedText variant="label-md" className={p.fg}>
                  {p.name}
                </ThemedText>
                <ThemedText variant="body-md" className={p.fg}>
                  {p.bg} / {p.fg}
                </ThemedText>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Surfaces">
          <View className="gap-sm">
            {SURFACES.map((s) => {
              const isInverse = s === "inverse";
              return (
                <ThemedView key={s} surface={s} radius="md" pad="md">
                  <ThemedText
                    variant="label-md"
                    className={isInverse ? "text-inverse-on-surface" : "text-on-surface"}
                  >
                    {s}
                  </ThemedText>
                </ThemedView>
              );
            })}
          </View>
        </Section>

        <Section title="Radius">
          <View className="flex-row flex-wrap gap-sm">
            {RADII.map((r) => (
              <View key={r} className="items-center gap-xs">
                <View className={`bg-primary-container h-16 w-16 rounded-${r}`} />
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  {r}
                </ThemedText>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Spacing">
          <ThemedView surface="container-lowest" radius="lg" pad="md" className="gap-sm">
            {SPACING.map((s) => (
              <View key={s} className="flex-row items-center gap-md">
                <ThemedText variant="label-sm" tone="on-surface-variant" className="w-8">
                  {s}
                </ThemedText>
                <View className={`bg-secondary-container p-${s} rounded-sm`}>
                  <View className="bg-tertiary h-2 w-2" />
                </View>
              </View>
            ))}
          </ThemedView>
        </Section>

        <Section title="Buttons">
          <View className="gap-sm">
            <Pressable className="bg-primary rounded-xl px-lg py-md active:opacity-80">
              <ThemedText variant="label-md" tone="on-primary" className="text-center">
                Primary action
              </ThemedText>
            </Pressable>
            <Pressable className="bg-secondary-container rounded-xl px-lg py-md active:opacity-80">
              <ThemedText variant="label-md" tone="primary" className="text-center">
                Secondary
              </ThemedText>
            </Pressable>
            <Pressable className="border-outline-variant rounded-xl border px-lg py-md active:opacity-80">
              <ThemedText variant="label-md" tone="on-surface" className="text-center">
                Outline
              </ThemedText>
            </Pressable>
            <Pressable className="bg-error rounded-xl px-lg py-md active:opacity-80">
              <ThemedText variant="label-md" tone="on-error" className="text-center">
                Destructive
              </ThemedText>
            </Pressable>
          </View>
        </Section>

        <Section title="Food card">
          <ThemedView
            surface="container-lowest"
            radius="lg"
            elevation="sm"
            className="overflow-hidden"
          >
            <View className="bg-primary-container h-40 w-full" />
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
                Spicy ramen bowl
              </ThemedText>
              <ThemedText variant="body-md" tone="on-surface-variant">
                Slow-cooked broth, soft-boiled egg, fresh scallions.
              </ThemedText>
              <View className="mt-sm flex-row items-center justify-between">
                <ThemedText variant="headline-md" tone="primary">
                  $12.50
                </ThemedText>
                <Pressable className="bg-primary h-12 w-12 items-center justify-center rounded-full active:opacity-80">
                  <ThemedText variant="headline-md" tone="on-primary">
                    +
                  </ThemedText>
                </Pressable>
              </View>
            </View>
          </ThemedView>
        </Section>

        <Section title="Loaders">
          <ThemedView surface="container-lowest" radius="lg" pad="md" className="gap-md">
            <View className="flex-row items-center gap-lg">
              <View className="items-center gap-xs">
                <Spinner tone="primary" size="sm" />
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  sm
                </ThemedText>
              </View>
              <View className="items-center gap-xs">
                <Spinner tone="primary" size="md" />
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  md
                </ThemedText>
              </View>
              <View className="items-center gap-xs">
                <Spinner tone="primary" size="lg" />
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  lg
                </ThemedText>
              </View>
              <View className="items-center gap-xs">
                <Spinner tone="error" size="md" />
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  error
                </ThemedText>
              </View>
            </View>

            <Pressable
              className="bg-primary rounded-xl flex-row items-center justify-center gap-sm px-lg py-md active:opacity-80"
              disabled
            >
              <Spinner tone="on-primary" size="sm" />
              <ThemedText variant="label-md" tone="on-primary">
                Placing order…
              </ThemedText>
            </Pressable>
          </ThemedView>
        </Section>

        <Section title="Skeletons">
          <ThemedView surface="container-lowest" radius="lg" pad="md" className="gap-md">
            <View className="flex-row items-center gap-md">
              <Skeleton shape="circle" style={{ width: 56, height: 56 }} />
              <View className="flex-1 gap-xs">
                <Skeleton shape="text" style={{ width: "50%", height: 18 }} />
                <Skeleton shape="text" style={{ width: "80%" }} />
              </View>
            </View>

            <SkeletonText lines={3} lastLineWidth="55%" />

            <View className="flex-row gap-sm">
              <Skeleton shape="pill" style={{ width: 72, height: 28 }} />
              <Skeleton shape="pill" style={{ width: 96, height: 28 }} />
              <Skeleton shape="pill" style={{ width: 64, height: 28 }} />
            </View>
          </ThemedView>

          <SkeletonCard />
        </Section>

        <Section title="Chips">
          <View className="flex-row flex-wrap gap-sm">
            {["Vegan", "Spicy", "Fastest", "New", "Popular"].map((label) => (
              <View key={label} className="bg-secondary-container rounded-full px-sm py-xs">
                <ThemedText variant="label-sm" tone="on-secondary-container">
                  {label}
                </ThemedText>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>
    </Screen>
  );
}
