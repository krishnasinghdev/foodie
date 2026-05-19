import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  TextInput,
  View,
} from "react-native";

import { ThemeToggle } from "@/components/theme-toggle";
import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";
import { useThemeColor } from "@/lib/theme";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type AddressItem = {
  id: string;
  label: string;
  detail: string;
  icon: IoniconName;
  isDefault?: boolean;
};

const INITIAL_ADDRESSES: AddressItem[] = [
  {
    id: "home",
    label: "Home",
    detail: "B-204, Aspen Heights, Hinjewadi Phase 2, Pune 411057",
    icon: "home",
    isDefault: true,
  },
  {
    id: "work",
    label: "Work",
    detail: "Dingg HQ, World Trade Center, Kharadi, Pune 411014",
    icon: "briefcase",
  },
];

type PaymentItem = {
  id: string;
  label: string;
  detail: string;
  icon: IoniconName;
};

const PAYMENTS: PaymentItem[] = [
  { id: "hdfc", label: "HDFC Credit Card", detail: "•••• 4421", icon: "card" },
  { id: "upi", label: "UPI", detail: "krishna@okhdfcbank", icon: "qr-code" },
  { id: "cod", label: "Cash on delivery", detail: "Pay on arrival", icon: "cash" },
];

const LABEL_OPTIONS: Array<{ value: string; icon: IoniconName }> = [
  { value: "Home", icon: "home" },
  { value: "Work", icon: "briefcase" },
  { value: "Other", icon: "location" },
];

export default function SettingsScreen() {
  const primary = useThemeColor("primary");
  const onSurfaceVariant = useThemeColor("on-surface-variant");

  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [offers, setOffers] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  const [addresses, setAddresses] = useState<AddressItem[]>(INITIAL_ADDRESSES);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const handleAddAddress = (label: string, detail: string, icon: IoniconName) => {
    setAddresses((prev) => [
      ...prev,
      { id: `addr-${Date.now()}`, label, detail, icon, isDefault: false },
    ]);
    setAddressModalOpen(false);
  };

  return (
    <Screen edges={["left", "right"]}>
      <ScrollView contentContainerClassName="gap-xl px-container-margin pb-xl pt-lg">
        <View className="gap-xs">
          <ThemedText variant="display-lg" tone="primary">
            Settings
          </ThemedText>
          <ThemedText tone="on-surface-variant">
            Manage how Foodie looks and behaves on this device.
          </ThemedText>
        </View>

        {/* Appearance */}
        <Section title="Appearance">
          <View className="gap-sm p-md">
            <View className="flex-row items-center gap-md">
              <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-container/60">
                <Ionicons name="contrast" size={18} color={primary} />
              </View>
              <View className="flex-1">
                <ThemedText variant="body-md">Theme</ThemedText>
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  Light, Dark, or follow system
                </ThemedText>
              </View>
            </View>
            <ThemeToggle className="self-start" />
          </View>
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <ToggleRow
            icon="notifications"
            iconColor={primary}
            label="Order updates"
            caption="Push alerts when your order moves"
            value={pushNotifs}
            onChange={setPushNotifs}
          />
          <ToggleRow
            icon="mail"
            iconColor={primary}
            label="Email receipts"
            caption="Get invoices in your inbox"
            value={emailNotifs}
            onChange={setEmailNotifs}
            divider
          />
          <ToggleRow
            icon="pricetag"
            iconColor={primary}
            label="Offers & promos"
            caption="Weekly deals and discounts"
            value={offers}
            onChange={setOffers}
            divider
          />
        </Section>

        {/* Addresses */}
        <Section
          title="Saved Addresses"
          trailing={
            <Pressable
              hitSlop={8}
              onPress={() => setAddressModalOpen(true)}
              className="flex-row items-center gap-xs active:opacity-70"
            >
              <Ionicons name="add" size={14} color={primary} />
              <ThemedText variant="label-sm" tone="primary">
                Add new
              </ThemedText>
            </Pressable>
          }
        >
          {addresses.map((addr, idx) => (
            <View
              key={addr.id}
              className={`flex-row items-start gap-md p-md ${
                idx === addresses.length - 1 ? "" : "border-b border-outline/15"
              }`}
            >
              <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-container/60">
                <Ionicons name={addr.icon} size={18} color={primary} />
              </View>
              <View className="flex-1 gap-xs">
                <View className="flex-row items-center gap-sm">
                  <ThemedText variant="body-md">{addr.label}</ThemedText>
                  {addr.isDefault ? (
                    <View className="rounded-full bg-secondary-container px-sm py-0.5">
                      <ThemedText variant="label-sm" tone="on-secondary-container">
                        Default
                      </ThemedText>
                    </View>
                  ) : null}
                </View>
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  {addr.detail}
                </ThemedText>
              </View>
              <Pressable hitSlop={8}>
                <Ionicons name="ellipsis-horizontal" size={18} color={onSurfaceVariant} />
              </Pressable>
            </View>
          ))}
        </Section>

        {/* Payments */}
        <Section title="Payment Methods">
          {PAYMENTS.map((p, idx) => (
            <View
              key={p.id}
              className={`flex-row items-center gap-md p-md ${
                idx === PAYMENTS.length - 1 ? "" : "border-b border-outline/15"
              }`}
            >
              <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-container/60">
                <Ionicons name={p.icon} size={18} color={primary} />
              </View>
              <View className="flex-1">
                <ThemedText variant="body-md">{p.label}</ThemedText>
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  {p.detail}
                </ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={16} color={onSurfaceVariant} />
            </View>
          ))}
        </Section>

        {/* Security */}
        <Section title="Security">
          <ToggleRow
            icon="finger-print"
            iconColor={primary}
            label="Biometric login"
            caption="Use Face ID / fingerprint to unlock"
            value={biometrics}
            onChange={setBiometrics}
          />
        </Section>

        <ThemedText variant="label-sm" tone="on-surface-variant" align="center">
          Foodie v1.0.0 · Build 24
        </ThemedText>
      </ScrollView>

      <AddAddressDialog
        visible={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onSubmit={handleAddAddress}
      />
    </Screen>
  );
}

function AddAddressDialog({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (label: string, detail: string, icon: IoniconName) => void;
}) {
  const primary = useThemeColor("primary");
  const onPrimary = useThemeColor("on-primary");
  const onSurface = useThemeColor("on-surface");
  const onSurfaceVariant = useThemeColor("on-surface-variant");

  const [label, setLabel] = useState("Home");
  const [icon, setIcon] = useState<IoniconName>("home");
  const [detail, setDetail] = useState("");

  const reset = () => {
    setLabel("Home");
    setIcon("home");
    setDetail("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!label.trim() || !detail.trim()) return;
    onSubmit(label.trim(), detail.trim(), icon);
    reset();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <Pressable onPress={handleClose} className="flex-1 items-center justify-center bg-black/85">
          {/* Stop propagation: tapping inside the card must not dismiss */}
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full max-w-105 gap-md rounded-3xl bg-surface p-lg"
            style={{ marginHorizontal: 24 }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between">
              <ThemedText variant="headline-md">New address</ThemedText>
              <Pressable hitSlop={8} onPress={handleClose}>
                <Ionicons name="close" size={20} color={onSurfaceVariant} />
              </Pressable>
            </View>

            {/* Label chips */}
            <View className="flex-row gap-xs">
              {LABEL_OPTIONS.map((opt) => {
                const active = label === opt.value;
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => {
                      setLabel(opt.value);
                      setIcon(opt.icon);
                    }}
                    className={`flex-row items-center gap-1 rounded-full px-sm py-1 active:opacity-80 ${
                      active ? "bg-primary-container" : "bg-surface-container"
                    }`}
                  >
                    <Ionicons
                      name={opt.icon}
                      size={12}
                      color={active ? primary : onSurfaceVariant}
                    />
                    <ThemedText
                      variant="label-sm"
                      tone={active ? "on-primary-container" : "on-surface-variant"}
                    >
                      {opt.value}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>

            {/* Address textarea */}
            <TextInput
              value={detail}
              onChangeText={setDetail}
              placeholder="Flat, area, city, pincode"
              placeholderTextColor={onSurfaceVariant}
              multiline
              numberOfLines={3}
              style={{
                color: onSurface,
                minHeight: 88,
                textAlignVertical: "top",
                fontFamily: "Inter_400Regular",
                fontSize: 14,
              }}
              className="rounded-2xl bg-surface-container px-md py-sm"
            />

            {/* Actions */}
            <View className="flex-row items-center justify-end gap-md pt-xs">
              <Pressable onPress={handleClose} hitSlop={8} className="active:opacity-70">
                <ThemedText variant="label-md" tone="on-surface-variant">
                  Cancel
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={handleSubmit}
                disabled={!detail.trim()}
                className={`rounded-full px-md py-sm active:opacity-90 ${
                  detail.trim() ? "bg-primary" : "bg-primary/40"
                }`}
              >
                <ThemedText variant="label-md" style={{ color: onPrimary }}>
                  Save
                </ThemedText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function Section({
  title,
  children,
  trailing,
}: {
  title: string;
  children: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <View className="gap-sm">
      <View className="flex-row items-center justify-between">
        <ThemedText variant="label-md" tone="on-surface-variant" uppercase>
          {title}
        </ThemedText>
        {trailing}
      </View>
      <View className="overflow-hidden rounded-2xl bg-surface-container">{children}</View>
    </View>
  );
}

function ToggleRow({
  icon,
  iconColor,
  label,
  caption,
  value,
  onChange,
  divider,
}: {
  icon: IoniconName;
  iconColor: string;
  label: string;
  caption: string;
  value: boolean;
  onChange: (next: boolean) => void;
  divider?: boolean;
}) {
  const primary = useThemeColor("primary");
  const tertiary = useThemeColor("tertiary");
  return (
    <View
      className={`flex-row items-center gap-md px-md py-md ${
        divider ? "border-t border-outline/15" : ""
      }`}
    >
      <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-container/60">
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View className="flex-1">
        <ThemedText variant="body-md">{label}</ThemedText>
        <ThemedText variant="label-sm" tone="on-surface-variant">
          {caption}
        </ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: primary, true: tertiary }}
        thumbColor="#ffffff"
        ios_backgroundColor={primary}
      />
    </View>
  );
}
