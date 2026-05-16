import { cva, type VariantProps } from "class-variance-authority";
import { View, type ViewProps } from "react-native";

import { cn } from "@/lib/cn";

const viewVariants = cva("", {
  variants: {
    surface: {
      background: "bg-background",
      surface: "bg-surface",
      "surface-dim": "bg-surface-dim",
      "surface-bright": "bg-surface-bright",
      "container-lowest": "bg-surface-container-lowest",
      "container-low": "bg-surface-container-low",
      container: "bg-surface-container",
      "container-high": "bg-surface-container-high",
      "container-highest": "bg-surface-container-highest",
      primary: "bg-primary",
      "primary-container": "bg-primary-container",
      secondary: "bg-secondary",
      "secondary-container": "bg-secondary-container",
      tertiary: "bg-tertiary",
      "tertiary-container": "bg-tertiary-container",
      error: "bg-error",
      "error-container": "bg-error-container",
      inverse: "bg-inverse-surface",
      transparent: "bg-transparent",
    },
    radius: {
      none: "",
      sm: "rounded-sm",
      DEFAULT: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    pad: {
      none: "",
      xs: "p-xs",
      sm: "p-sm",
      md: "p-md",
      lg: "p-lg",
      xl: "p-xl",
    },
    gap: {
      none: "",
      xs: "gap-xs",
      sm: "gap-sm",
      md: "gap-md",
      lg: "gap-lg",
      xl: "gap-xl",
    },
    border: {
      none: "",
      outline: "border border-outline",
      "outline-variant": "border border-outline-variant",
    },
    elevation: {
      none: "",
      sm: "shadow-sm shadow-black/10",
      md: "shadow-md shadow-black/15",
      lg: "shadow-lg shadow-black/20",
    },
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
  },
  compoundVariants: [
    // Inverse surfaces should not also receive an outline-color border by default
    { surface: "inverse", border: "outline", class: "border-inverse-surface" },
  ],
  defaultVariants: {
    surface: "background",
    radius: "none",
    pad: "none",
    gap: "none",
    border: "none",
    elevation: "none",
  },
});

export type ThemedViewProps = ViewProps &
  VariantProps<typeof viewVariants> & {
    className?: string;
  };

export function ThemedView({
  surface,
  radius,
  pad,
  gap,
  border,
  elevation,
  direction,
  className,
  ...rest
}: ThemedViewProps) {
  return (
    <View
      className={cn(
        viewVariants({ surface, radius, pad, gap, border, elevation, direction }),
        className,
      )}
      {...rest}
    />
  );
}

export { viewVariants };
