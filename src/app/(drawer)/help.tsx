import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";
import { useThemeColor } from "@/lib/theme";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type Topic = {
  id: string;
  icon: IoniconName;
  title: string;
  caption: string;
};

const TOPICS: Topic[] = [
  {
    id: "order",
    icon: "bag-handle",
    title: "Order issues",
    caption: "Missing items, delays, wrong order",
  },
  {
    id: "refund",
    icon: "wallet",
    title: "Refunds & payments",
    caption: "Failed payment, refund status",
  },
  {
    id: "account",
    icon: "person-circle",
    title: "Account & login",
    caption: "Email, phone, password",
  },
  {
    id: "delivery",
    icon: "bicycle",
    title: "Delivery & address",
    caption: "Change address, contact rider",
  },
];

type Faq = { id: string; question: string; answer: string };

const FAQS: Faq[] = [
  {
    id: "f1",
    question: "How do I cancel an order?",
    answer:
      "You can cancel within 60 seconds of placing the order from the My Orders screen. After that, the restaurant has already started preparing your food.",
  },
  {
    id: "f2",
    question: "When will I get my refund?",
    answer:
      "Refunds are credited to your original payment method within 5-7 business days. UPI refunds usually land within 24 hours.",
  },
  {
    id: "f3",
    question: "Why is delivery taking longer than promised?",
    answer:
      "Delays usually happen during rain, traffic, or high-demand windows. You can chat with your rider directly from the order screen.",
  },
  {
    id: "f4",
    question: "How do I report a missing item?",
    answer:
      "Open the order, tap 'Help with this order', and select 'Missing items'. Our support team responds within 10 minutes.",
  },
];

export default function HelpScreen() {
  const primary = useThemeColor("primary");
  const onPrimary = useThemeColor("on-primary");
  const onSurfaceVariant = useThemeColor("on-surface-variant");

  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  return (
    <Screen edges={["left", "right"]}>
      <ScrollView contentContainerClassName="gap-md px-container-margin">
        <View className="mt-sm items-center gap-xs">
          <ThemedText tone="on-surface-variant">
            We're here 24/7. Browse topics or chat with us.
          </ThemedText>
        </View>

        {/* Contact card */}
        <View className="gap-md rounded-2xl bg-primary-container p-md">
          <View className="flex-row items-center gap-md">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-primary">
              <Ionicons name="chatbubbles" size={22} color={onPrimary} />
            </View>
            <View className="flex-1">
              <ThemedText variant="headline-md" tone="on-primary-container">
                Talk to support
              </ThemedText>
              <ThemedText variant="label-sm" tone="on-primary-container">
                Avg. reply in under 2 minutes
              </ThemedText>
            </View>
          </View>
          <View className="flex-row gap-sm">
            <Pressable className="flex-1 flex-row items-center justify-center gap-xs rounded-full bg-primary py-sm active:opacity-90">
              <Ionicons name="chatbubble-ellipses" size={16} color={onPrimary} />
              <ThemedText variant="label-md" tone="on-primary">
                Chat
              </ThemedText>
            </Pressable>
            <Pressable className="flex-1 flex-row items-center justify-center gap-xs rounded-full border border-on-primary-container/40 py-sm active:opacity-80">
              <Ionicons name="call" size={16} color={primary} />
              <ThemedText variant="label-md" tone="on-primary-container">
                Call us
              </ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Browse topics */}
        <View className="gap-sm">
          <ThemedText variant="label-md" tone="on-surface-variant" uppercase>
            Browse Topics
          </ThemedText>
          <View className="flex-row flex-wrap gap-sm">
            {TOPICS.map((t) => (
              <Pressable
                key={t.id}
                className="w-[48%] gap-sm rounded-2xl bg-surface-container p-md active:opacity-80"
              >
                <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-container/60">
                  <Ionicons name={t.icon} size={20} color={primary} />
                </View>
                <View className="gap-xs">
                  <ThemedText variant="body-md">{t.title}</ThemedText>
                  <ThemedText variant="label-sm" tone="on-surface-variant" numberOfLines={2}>
                    {t.caption}
                  </ThemedText>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* FAQ */}
        <View className="gap-sm">
          <ThemedText variant="label-md" tone="on-surface-variant" uppercase>
            Frequently Asked
          </ThemedText>
          <View className="overflow-hidden rounded-2xl bg-surface-container">
            {FAQS.map((f, idx) => {
              const open = openId === f.id;
              return (
                <View
                  key={f.id}
                  className={idx === FAQS.length - 1 ? "" : "border-b border-outline/15"}
                >
                  <Pressable
                    onPress={() => setOpenId(open ? null : f.id)}
                    className="flex-row items-center gap-md px-md py-md active:bg-surface-container-high"
                  >
                    <View className="flex-1">
                      <ThemedText variant="body-md">{f.question}</ThemedText>
                    </View>
                    <Ionicons
                      name={open ? "chevron-up" : "chevron-down"}
                      size={16}
                      color={onSurfaceVariant}
                    />
                  </Pressable>
                  {open ? (
                    <View className="px-md pb-md">
                      <ThemedText variant="body-md" tone="on-surface-variant">
                        {f.answer}
                      </ThemedText>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>

        {/* Contact details */}
        <View className="gap-sm">
          <ThemedText variant="label-md" tone="on-surface-variant" uppercase>
            Reach Us
          </ThemedText>
          <View className="overflow-hidden rounded-2xl bg-surface-container">
            <ContactRow icon="mail" label="Email" value="support@foodie.app" />
            <ContactRow icon="call" label="Phone" value="+91 80 1234 5678" divider />
            <ContactRow icon="time" label="Hours" value="Open 24 × 7" divider />
          </View>
        </View>

        <ThemedText variant="label-sm" tone="on-surface-variant" align="center">
          Foodie v1.0.0 · We usually reply within 2 minutes
        </ThemedText>
      </ScrollView>
    </Screen>
  );
}

function ContactRow({
  icon,
  label,
  value,
  divider,
}: {
  icon: IoniconName;
  label: string;
  value: string;
  divider?: boolean;
}) {
  const primary = useThemeColor("primary");
  return (
    <View
      className={`flex-row items-center gap-md px-md py-md ${
        divider ? "border-t border-outline/15" : ""
      }`}
    >
      <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-container/60">
        <Ionicons name={icon} size={18} color={primary} />
      </View>
      <View className="flex-1">
        <ThemedText variant="label-sm" tone="on-surface-variant">
          {label}
        </ThemedText>
        <ThemedText variant="body-md">{value}</ThemedText>
      </View>
    </View>
  );
}
