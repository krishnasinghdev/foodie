import { cva, type VariantProps } from "class-variance-authority";
import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";

import { cn } from "@/lib/cn";
import { useThemeColor } from "@/lib/theme";

const spinnerVariants = cva("", {
  variants: {
    tone: {
      primary: "",
      "on-primary": "",
      "on-surface": "",
      "on-surface-variant": "",
      error: "",
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

export type SpinnerProps = Omit<ActivityIndicatorProps, "color" | "size"> &
  VariantProps<typeof spinnerVariants> & {
    size?: "sm" | "md" | "lg";
    className?: string;
  };

export function Spinner({ tone = "primary", size = "md", className, ...rest }: SpinnerProps) {
  const color = useThemeColor(tone ?? "primary");
  const nativeSize = size === "sm" ? "small" : "large";
  const scale = size === "lg" ? { transform: [{ scale: 1.4 }] } : undefined;
  return (
    <ActivityIndicator
      className={cn(spinnerVariants({ tone }), className)}
      color={color}
      size={nativeSize}
      style={scale}
      {...rest}
    />
  );
}
