import { Ionicons } from "@expo/vector-icons";
import { Link, type Href } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";
import { useCart } from "@/lib/cart-context";
import { useThemeColor } from "@/lib/theme";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type Row = {
  icon: IoniconName;
  label: string;
  href: Href;
  caption?: string;
};

export default function ProfileScreen() {
  const primary = useThemeColor("primary");
  const onPrimary = useThemeColor("on-primary");
  const onSurface = useThemeColor("on-surface");
  const onSurfaceVariant = useThemeColor("on-surface-variant");
  const error = useThemeColor("error");

  const { orders, totalQuantity } = useCart();

  const accountRows: Row[] = [
    { icon: "bag-handle", label: "My Orders", href: "/orders", caption: `${orders.length} active` },
    { icon: "heart", label: "Favourites", href: "/" },
    { icon: "card", label: "Payments", href: "/settings" },
  ];

  const settingsRows: Row[] = [
    { icon: "settings-sharp", label: "Settings", href: "/settings" },
    { icon: "help-circle", label: "Help & Support", href: "/help" },
    { icon: "color-palette", label: "Showcase", href: "/showcase" },
  ];

  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-xl px-container-margin pb-32 pt-lg">
        {/* Header */}
        <View className="items-center gap-md">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-primary-container">
            <ThemedText
              tone="on-primary-container"
              style={{ fontSize: 32, lineHeight: 36, fontFamily: "Inter_600SemiBold" }}
            >
              KS
            </ThemedText>
          </View>
          <View className="items-center gap-xs">
            <ThemedText variant="headline-lg">Krishna Singh</ThemedText>
            <View className="flex-row items-center gap-xs rounded-full bg-secondary-container px-sm py-1">
              <Ionicons name="star" size={12} color={primary} />
              <ThemedText variant="label-sm" tone="on-secondary-container">
                Rewards Member · 420 pts
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row gap-sm">
          <StatCard value={orders.length} label="Orders" />
          <StatCard value={totalQuantity} label="In cart" />
          <StatCard value={420} label="Points" />
        </View>

        {/* Quick action: Cart */}
        <Link href="/orders" asChild>
          <Pressable className="flex-row items-center gap-md rounded-2xl bg-primary-container p-md active:opacity-90">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-primary">
              <Ionicons name="cart" size={22} color={onPrimary} />
            </View>
            <View className="flex-1 gap-xs">
              <ThemedText variant="headline-md" tone="on-primary-container">
                Your Cart
              </ThemedText>
              <ThemedText variant="label-sm" tone="on-primary-container">
                {totalQuantity > 0
                  ? `${totalQuantity} item${totalQuantity > 1 ? "s" : ""} ready for checkout`
                  : "Your cart is empty"}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={onSurface} />
          </Pressable>
        </Link>

        {/* Account section */}
        <Section title="Account">
          {accountRows.map((row, idx) => (
            <MenuRow
              key={row.label}
              row={row}
              isLast={idx === accountRows.length - 1}
              iconColor={primary}
              chevronColor={onSurfaceVariant}
            />
          ))}
        </Section>

        {/* Preferences */}
        <Section title="Preferences">
          {settingsRows.map((row, idx) => (
            <MenuRow
              key={row.label}
              row={row}
              isLast={idx === settingsRows.length - 1}
              iconColor={primary}
              chevronColor={onSurfaceVariant}
            />
          ))}
        </Section>

        {/* Logout */}
        <Link href="/logout" asChild>
          <Pressable className="flex-row items-center justify-center gap-sm rounded-2xl border border-error/30 py-md active:opacity-80">
            <Ionicons name="log-out-outline" size={20} color={error} />
            <ThemedText variant="label-md" tone="error">
              Log out
            </ThemedText>
          </Pressable>
        </Link>

        <ThemedText variant="label-sm" tone="on-surface-variant" align="center">
          Foodie v1.0.0
        </ThemedText>
      </ScrollView>
    </Screen>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <View className="flex-1 items-center gap-xs rounded-2xl bg-surface-container px-sm py-md">
      <ThemedText variant="headline-lg" tone="primary">
        {value}
      </ThemedText>
      <ThemedText variant="label-sm" tone="on-surface-variant">
        {label}
      </ThemedText>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-sm">
      <ThemedText variant="label-md" tone="on-surface-variant" uppercase>
        {title}
      </ThemedText>
      <View className="overflow-hidden rounded-2xl bg-surface-container">{children}</View>
    </View>
  );
}

function MenuRow({
  row,
  isLast,
  iconColor,
  chevronColor,
}: {
  row: Row;
  isLast: boolean;
  iconColor: string;
  chevronColor: string;
}) {
  return (
    <Link href={row.href} asChild>
      <Pressable
        className={`flex-row items-center gap-md px-md py-md active:bg-surface-container-high ${
          isLast ? "" : "border-b border-outline/15"
        }`}
      >
        <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-container/60">
          <Ionicons name={row.icon} size={18} color={iconColor} />
        </View>
        <View className="flex-1">
          <ThemedText variant="body-md">{row.label}</ThemedText>
          {row.caption ? (
            <ThemedText variant="label-sm" tone="on-surface-variant">
              {row.caption}
            </ThemedText>
          ) : null}
        </View>
        <Ionicons name="chevron-forward" size={16} color={chevronColor} />
      </Pressable>
    </Link>
  );
}
