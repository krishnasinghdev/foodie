import { type AndroidSymbol, type SFSymbol, SymbolView } from "expo-symbols";

export type TabIconName = "home" | "search" | "orders" | "profile" | "showcase";

type Mapping = {
  ios: { active: SFSymbol; inactive: SFSymbol };
  /** Material symbol name for Android (see expo-symbols/android docs) */
  android: { active: AndroidSymbol; inactive: AndroidSymbol };
};

const ICONS: Record<TabIconName, Mapping> = {
  home: {
    ios: { active: "house.fill", inactive: "house" },
    android: { active: "home", inactive: "home" },
  },
  search: {
    ios: { active: "magnifyingglass", inactive: "magnifyingglass" },
    android: { active: "search", inactive: "search" },
  },
  orders: {
    ios: { active: "bag.fill", inactive: "bag" },
    android: { active: "shopping_bag", inactive: "shopping_bag" },
  },
  profile: {
    ios: { active: "person.crop.circle.fill", inactive: "person.crop.circle" },
    android: { active: "person", inactive: "person" },
  },
  showcase: {
    ios: { active: "paintpalette.fill", inactive: "paintpalette" },
    android: { active: "palette", inactive: "palette" },
  },
};

export function TabBarIcon({
  name,
  color,
  focused,
  size = 26,
}: {
  name: TabIconName;
  color: string;
  focused: boolean;
  size?: number;
}) {
  const mapping = ICONS[name];
  const ios = focused ? mapping.ios.active : mapping.ios.inactive;
  const android = focused ? mapping.android.active : mapping.android.inactive;

  return (
    <SymbolView
      name={{ ios, android }}
      tintColor={color}
      size={size}
      weight={focused ? "semibold" : "regular"}
    />
  );
}
