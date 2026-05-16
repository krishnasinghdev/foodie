import { cva, type VariantProps } from "class-variance-authority";
import { Text, type TextProps } from "react-native";

import { cn } from "@/lib/cn";

const textVariants = cva("", {
  variants: {
    variant: {
      "display-lg": "text-display-lg",
      "headline-lg": "text-headline-lg",
      "headline-lg-mobile": "text-headline-lg-mobile",
      "headline-md": "text-headline-md",
      "body-lg": "text-body-lg",
      "body-md": "text-body-md",
      "label-md": "text-label-md",
      "label-sm": "text-label-sm",
    },
    tone: {
      "on-surface": "text-on-surface",
      "on-surface-variant": "text-on-surface-variant",
      "on-background": "text-on-background",
      "on-primary": "text-on-primary",
      "on-primary-container": "text-on-primary-container",
      "on-secondary": "text-on-secondary",
      "on-secondary-container": "text-on-secondary-container",
      "on-tertiary": "text-on-tertiary",
      "on-tertiary-container": "text-on-tertiary-container",
      "on-error": "text-on-error",
      "on-error-container": "text-on-error-container",
      "inverse-on-surface": "text-inverse-on-surface",
      primary: "text-primary",
      secondary: "text-secondary",
      tertiary: "text-tertiary",
      error: "text-error",
      outline: "text-outline",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    uppercase: {
      true: "uppercase",
      false: "",
    },
  },
  compoundVariants: [
    // Labels read better with a touch of tracking when uppercased
    { variant: "label-md", uppercase: true, class: "tracking-wider" },
    { variant: "label-sm", uppercase: true, class: "tracking-wider" },
  ],
  defaultVariants: {
    variant: "body-md",
    tone: "on-surface",
    align: "left",
    uppercase: false,
  },
});

export type ThemedTextProps = TextProps &
  VariantProps<typeof textVariants> & {
    className?: string;
  };

export function ThemedText({
  variant,
  tone,
  align,
  uppercase,
  className,
  ...rest
}: ThemedTextProps) {
  return (
    <Text className={cn(textVariants({ variant, tone, align, uppercase }), className)} {...rest} />
  );
}

export { textVariants };
