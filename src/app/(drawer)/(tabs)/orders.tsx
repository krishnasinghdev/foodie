import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

import { Screen } from "@/components/ui/screen";
import { ThemedText } from "@/components/ui/themed-text";
import { useCart, type CartItem, type Order, type OrderStatus } from "@/lib/cart-context";
import { cn } from "@/lib/cn";

const DELIVERY_FEE = 39;
const PLATFORM_FEE = 6;

export default function OrdersScreen() {
  const {
    items,
    totalQuantity,
    totalPrice,
    orders,
    increment,
    decrement,
    remove,
    clear,
    placeOrder,
  } = useCart();

  const itemsByRestaurant = items.reduce<Record<string, { name: string; items: CartItem[] }>>(
    (acc, item) => {
      if (!acc[item.restaurantId]) {
        acc[item.restaurantId] = { name: item.restaurantName, items: [] };
      }
      acc[item.restaurantId].items.push(item);
      return acc;
    },
    {},
  );

  const grandTotal = totalPrice + (items.length > 0 ? DELIVERY_FEE + PLATFORM_FEE : 0);

  const handlePlaceOrder = () => {
    placeOrder(grandTotal);
  };

  return (
    <Screen>
      <View className="flex-1">
        <ScrollView contentContainerClassName="gap-xl px-container-margin pb-48 pt-lg">
          <View className="gap-xs">
            <ThemedText variant="display-lg" tone="primary">
              Orders
            </ThemedText>
            <ThemedText tone="on-surface-variant">
              {totalQuantity > 0
                ? `${totalQuantity} item${totalQuantity > 1 ? "s" : ""} ready to checkout`
                : "Your cart is empty"}
            </ThemedText>
          </View>

          {/* Cart Section */}
          {items.length > 0 ? (
            <View className="gap-md">
              <View className="flex-row items-center justify-between">
                <ThemedText variant="headline-md">Your Cart</ThemedText>
                <Pressable onPress={clear} hitSlop={8}>
                  <ThemedText variant="label-sm" tone="error">
                    Clear all
                  </ThemedText>
                </Pressable>
              </View>

              {Object.entries(itemsByRestaurant).map(([rid, group]) => (
                <View key={rid} className="overflow-hidden rounded-2xl bg-surface-container">
                  <View className="border-b border-outline/20 px-md py-sm">
                    <ThemedText variant="label-md" tone="primary">
                      {group.name}
                    </ThemedText>
                  </View>

                  <View className="gap-sm p-md">
                    {group.items.map((item) => (
                      <View key={item.id} className="flex-row items-center gap-sm">
                        <Image
                          source={{ uri: item.image }}
                          style={{ width: 56, height: 56, borderRadius: 12 }}
                          contentFit="cover"
                        />

                        <View className="flex-1 gap-xs">
                          <View className="flex-row items-center gap-xs">
                            <View
                              className={cn(
                                "h-2.5 w-2.5 rounded-full",
                                item.isVeg ? "bg-green-500" : "bg-red-500",
                              )}
                            />
                            <ThemedText variant="body-md" numberOfLines={1}>
                              {item.title}
                            </ThemedText>
                          </View>
                          <ThemedText variant="label-sm" tone="on-surface-variant">
                            ₹{item.price} each
                          </ThemedText>
                        </View>

                        <View className="items-end gap-xs">
                          <View className="flex-row items-center gap-sm rounded-full bg-primary px-2 py-1">
                            <Pressable
                              onPress={() =>
                                item.quantity === 1 ? remove(item.id) : decrement(item.id)
                              }
                              className="h-6 w-6 items-center justify-center rounded-full active:opacity-70"
                              hitSlop={8}
                            >
                              <ThemedText variant="label-md" tone="on-primary">
                                −
                              </ThemedText>
                            </Pressable>
                            <ThemedText variant="label-md" tone="on-primary">
                              {item.quantity}
                            </ThemedText>
                            <Pressable
                              onPress={() => increment(item.id)}
                              className="h-6 w-6 items-center justify-center rounded-full active:opacity-70"
                              hitSlop={8}
                            >
                              <ThemedText variant="label-md" tone="on-primary">
                                +
                              </ThemedText>
                            </Pressable>
                          </View>
                          <ThemedText variant="label-md">₹{item.price * item.quantity}</ThemedText>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ))}

              {/* Bill summary */}
              <View className="gap-sm rounded-2xl bg-surface-container p-md">
                <ThemedText variant="label-md" tone="on-surface-variant" uppercase>
                  Bill details
                </ThemedText>
                <View className="flex-row justify-between">
                  <ThemedText tone="on-surface-variant">Item total</ThemedText>
                  <ThemedText>₹{totalPrice}</ThemedText>
                </View>
                <View className="flex-row justify-between">
                  <ThemedText tone="on-surface-variant">Delivery fee</ThemedText>
                  <ThemedText>₹{DELIVERY_FEE}</ThemedText>
                </View>
                <View className="flex-row justify-between">
                  <ThemedText tone="on-surface-variant">Platform fee</ThemedText>
                  <ThemedText>₹{PLATFORM_FEE}</ThemedText>
                </View>
                <View className="h-px bg-outline/20" />
                <View className="flex-row justify-between">
                  <ThemedText variant="headline-md">Total</ThemedText>
                  <ThemedText variant="headline-md">₹{grandTotal}</ThemedText>
                </View>
              </View>
            </View>
          ) : (
            <View className="items-center gap-sm rounded-2xl bg-surface-container px-lg py-xl">
              <ThemedText variant="headline-md" align="center">
                Nothing in your cart yet
              </ThemedText>
              <ThemedText tone="on-surface-variant" align="center">
                Browse restaurants and tap “Add” on a dish to start your order.
              </ThemedText>
              <Link href="/" className="mt-sm rounded-full bg-primary px-lg py-sm">
                <ThemedText variant="label-md" tone="on-primary">
                  Explore restaurants
                </ThemedText>
              </Link>
            </View>
          )}

          {/* Past Orders */}
          <View className="gap-md">
            <ThemedText variant="headline-md">Past Orders</ThemedText>

            {orders.map((order) => (
              <LiveOrderCard key={order.id} order={order} />
            ))}

            <View className="gap-sm rounded-2xl bg-surface-container p-md">
              <View className="flex-row justify-between">
                <ThemedText variant="label-md" tone="primary">
                  Green Bowl
                </ThemedText>
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  Yesterday
                </ThemedText>
              </View>
              <ThemedText tone="on-surface-variant">
                Mexican Protein Bowl, Berry Smoothie Bowl
              </ThemedText>
              <View className="flex-row justify-between">
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  Delivered • ₹548
                </ThemedText>
                <ThemedText variant="label-sm" tone="primary">
                  Reorder
                </ThemedText>
              </View>
            </View>

            <View className="gap-sm rounded-2xl bg-surface-container p-md">
              <View className="flex-row justify-between">
                <ThemedText variant="label-md" tone="primary">
                  Spice Kitchen
                </ThemedText>
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  3 days ago
                </ThemedText>
              </View>
              <ThemedText tone="on-surface-variant">Butter Chicken, Veg Dum Biryani</ThemedText>
              <View className="flex-row justify-between">
                <ThemedText variant="label-sm" tone="on-surface-variant">
                  Delivered • ₹608
                </ThemedText>
                <ThemedText variant="label-sm" tone="primary">
                  Reorder
                </ThemedText>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Floating Order button */}
        {items.length > 0 && (
          <View pointerEvents="box-none" className="absolute bottom-28 left-0 right-0 items-center">
            <Pressable
              onPress={handlePlaceOrder}
              className="flex-row items-center gap-sm rounded-full bg-primary py-2 pl-2 pr-4 shadow-lg active:opacity-90"
            >
              <View className="h-7 min-w-7 items-center justify-center rounded-full bg-on-primary/15 px-2">
                <ThemedText variant="label-sm" tone="on-primary">
                  {totalQuantity}
                </ThemedText>
              </View>
              <ThemedText variant="label-sm" tone="on-primary">
                Place Order
              </ThemedText>
              <View className="h-3 w-px bg-on-primary/30" />
              <ThemedText variant="label-sm" tone="on-primary">
                ₹{grandTotal}
              </ThemedText>
            </Pressable>
          </View>
        )}
      </View>
    </Screen>
  );
}

function statusTone(status: OrderStatus) {
  if (status === "Preparing") return "tertiary" as const;
  if (status === "Out for delivery") return "secondary" as const;
  return "primary" as const;
}

function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return new Date(ts).toLocaleDateString();
}

function LiveOrderCard({ order }: { order: Order }) {
  const restaurantNames = Array.from(new Set(order.items.map((i) => i.restaurantName))).join(", ");
  const itemTitles = order.items.map((i) => `${i.title} × ${i.quantity}`).join(", ");

  return (
    <View className="gap-sm rounded-2xl bg-surface-container p-md">
      <View className="flex-row justify-between">
        <ThemedText variant="label-md" tone="primary">
          {restaurantNames}
        </ThemedText>
        <ThemedText variant="label-sm" tone="on-surface-variant">
          {formatRelative(order.placedAt)}
        </ThemedText>
      </View>
      <ThemedText tone="on-surface-variant" numberOfLines={2}>
        {itemTitles}
      </ThemedText>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-xs">
          <View className="h-2 w-2 rounded-full bg-tertiary" />
          <ThemedText variant="label-sm" tone={statusTone(order.status)}>
            {order.status}
          </ThemedText>
          <ThemedText variant="label-sm" tone="on-surface-variant">
            • ₹{order.total}
          </ThemedText>
        </View>
        <ThemedText variant="label-sm" tone="primary">
          Track
        </ThemedText>
      </View>
    </View>
  );
}
