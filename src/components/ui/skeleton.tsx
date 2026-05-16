import { cva, type VariantProps } from "class-variance-authority";
import { useEffect } from "react";
import { View, type ViewProps } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@/lib/cn";

const skeletonVariants = cva("bg-surface-container-high overflow-hidden", {
  variants: {
    shape: {
      rect: "",
      text: "h-4",
      circle: "rounded-full",
      pill: "rounded-full",
    },
    radius: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
    tone: {
      neutral: "bg-surface-container-high",
      strong: "bg-surface-container-highest",
      onPrimary: "bg-primary-container/60",
    },
  },
  compoundVariants: [
    { shape: "text", radius: "none", class: "rounded-sm" },
    { shape: "rect", radius: "none", class: "rounded-md" },
  ],
  defaultVariants: {
    shape: "rect",
    radius: "none",
    tone: "neutral",
  },
});

export type SkeletonProps = ViewProps &
  VariantProps<typeof skeletonVariants> & {
    className?: string;
  };

export function Skeleton({ shape, radius, tone, className, style, ...rest }: SkeletonProps) {
  const pulse = useSharedValue(0.4);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [pulse]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return (
    <Animated.View
      className={cn(skeletonVariants({ shape, radius, tone }), className)}
      style={[animatedStyle, style]}
      {...rest}
    />
  );
}

export function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
  className,
}: {
  lines?: number;
  lastLineWidth?: number | `${number}%`;
  className?: string;
}) {
  return (
    <View className={cn("gap-xs", className)}>
      {Array.from({ length: lines }).map((_, i) => {
        const isLast = i === lines - 1;
        return (
          <Skeleton
            key={i}
            shape="text"
            style={isLast ? { width: lastLineWidth } : { width: "100%" }}
          />
        );
      })}
    </View>
  );
}

export function SkeletonCard() {
  return (
    <View className="bg-surface-container-lowest rounded-lg overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <View className="gap-sm p-md">
        <Skeleton shape="text" style={{ width: "40%", height: 20 }} />
        <SkeletonText lines={2} lastLineWidth="70%" />
        <View className="mt-sm flex-row items-center justify-between">
          <Skeleton shape="text" style={{ width: 80, height: 24 }} />
          <Skeleton shape="circle" style={{ width: 48, height: 48 }} />
        </View>
      </View>
    </View>
  );
}
