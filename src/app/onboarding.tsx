import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";
import { useThemeColor } from "@/lib/theme";

type Slide = {
  id: string;
  image: string;
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    id: "discover",
    image:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Discover great food",
    body: "Browse hand-picked restaurants near you with reviews, ratings, and chef specials.",
  },
  {
    id: "fast",
    image:
      "https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Fast, reliable delivery",
    body: "Live order tracking from kitchen to doorstep. Most meals arrive in under 30 minutes.",
  },
  {
    id: "rewards",
    image:
      "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Earn while you eat",
    body: "Collect reward points on every order and unlock exclusive offers from your favourites.",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function OnboardingScreen() {
  const primary = useThemeColor("primary");
  const onPrimary = useThemeColor("on-primary");

  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const isLast = index === SLIDES.length - 1;

  const goTo = (next: number) => {
    scrollRef.current?.scrollTo({ x: next * SCREEN_WIDTH, animated: true });
    setIndex(next);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (next !== index) setIndex(next);
  };

  const handleNext = () => {
    if (isLast) {
      router.replace("/");
      return;
    }
    goTo(index + 1);
  };

  return (
    <Screen surface="background">
      <View className="flex-1">
        {/* Skip */}
        <View className="flex-row justify-end px-container-margin pt-sm">
          <Pressable onPress={() => router.replace("/")} hitSlop={8} className="active:opacity-70">
            <ThemedText variant="label-md" tone="on-surface-variant">
              Skip
            </ThemedText>
          </Pressable>
        </View>

        {/* Slides */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          className="flex-1"
        >
          {SLIDES.map((slide) => (
            <View
              key={slide.id}
              style={{ width: SCREEN_WIDTH }}
              className="items-center justify-center gap-xl px-container-margin"
            >
              <View className="overflow-hidden rounded-[40px] bg-surface-container">
                <Image
                  source={{ uri: slide.image }}
                  style={{ width: SCREEN_WIDTH - 64, height: SCREEN_WIDTH - 64 }}
                  contentFit="cover"
                />
              </View>
              <View className="gap-sm">
                <ThemedText variant="display-lg" tone="primary" align="center">
                  {slide.title}
                </ThemedText>
                <ThemedText variant="body-lg" tone="on-surface-variant" align="center">
                  {slide.body}
                </ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Footer */}
        <View className="gap-lg px-container-margin pb-xl">
          {/* Page indicators */}
          <View className="flex-row items-center justify-center gap-xs">
            {SLIDES.map((s, i) => {
              const active = i === index;
              return (
                <Pressable
                  key={s.id}
                  onPress={() => goTo(i)}
                  hitSlop={8}
                  style={{
                    height: 8,
                    width: active ? 24 : 8,
                    borderRadius: 999,
                    backgroundColor: active ? primary : "rgba(127,127,127,0.3)",
                  }}
                />
              );
            })}
          </View>

          {/* Primary action */}
          <Pressable
            onPress={handleNext}
            className="flex-row items-center justify-center gap-sm rounded-full bg-primary py-md active:opacity-90"
          >
            <ThemedText variant="label-md" style={{ color: onPrimary }}>
              {isLast ? "Get started" : "Next"}
            </ThemedText>
            <Ionicons name={isLast ? "checkmark" : "arrow-forward"} size={18} color={onPrimary} />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
