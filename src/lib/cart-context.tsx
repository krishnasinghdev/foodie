import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  isVeg: boolean;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
};

type AddInput = Omit<CartItem, "quantity">;

export type OrderStatus = "Preparing" | "Out for delivery" | "Delivered";

export type Order = {
  id: string;
  placedAt: number;
  items: CartItem[];
  total: number;
  status: OrderStatus;
};

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  orders: Order[];
  add: (item: AddInput) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  placeOrder: (total: number) => Order | null;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const add = useCallback((item: AddInput) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const increment = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  }, []);

  const decrement = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const placeOrder = useCallback((total: number): Order | null => {
    let placed: Order | null = null;
    setItems((current) => {
      if (current.length === 0) return current;
      placed = {
        id: `ORD-${Date.now()}`,
        placedAt: Date.now(),
        items: current,
        total,
        status: "Preparing",
      };
      setOrders((prev) => [placed as Order, ...prev]);
      return [];
    });
    return placed;
  }, []);

  const { totalQuantity, totalPrice } = useMemo(() => {
    return items.reduce(
      (acc, i) => {
        acc.totalQuantity += i.quantity;
        acc.totalPrice += i.quantity * i.price;
        return acc;
      },
      { totalQuantity: 0, totalPrice: 0 },
    );
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalQuantity,
      totalPrice,
      orders,
      add,
      increment,
      decrement,
      remove,
      clear,
      placeOrder,
    }),
    [
      items,
      totalQuantity,
      totalPrice,
      orders,
      add,
      increment,
      decrement,
      remove,
      clear,
      placeOrder,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
