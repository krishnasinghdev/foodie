# Foodie

A food‑ordering UI built with **Expo SDK 56 (beta)**, **React 19.2**, **React Native 0.85**, **expo‑router**, and **NativeWind v5 / Tailwind v4**. The app explores the new Expo glass effect, file‑based routing with nested navigators (Drawer → Tabs → Stack), and a custom themed design system.

## Stack

- Expo SDK **56.0.7** (preview), React **19.2.3**, React Native **0.85.3**, react‑native‑web ~0.21
- `expo-router` ~56 with `typedRoutes` + `reactCompiler` experiments (see `app.json`)
- **NativeWind v5 preview** (`5.0.0-preview.3`) on **Tailwind v4** via `@tailwindcss/postcss` — no `tailwind.config.js`; Tailwind is configured in `src/global.css`
- `expo-glass-effect`, `expo-symbols`, `expo-image`, `@expo/ui`, `@expo/vector-icons`
- Google fonts via `@expo-google-fonts/{inter,manrope,playfair-display}`
- **pnpm** (`nodeLinker: hoisted`) as the package manager
- **oxlint + oxfmt** for lint / format (no eslint / prettier)

## Commands

```bash
pnpm start              # expo start
pnpm ios | android | web
pnpm lint               # expo lint
pnpm check              # oxlint --fix && oxfmt --write (run before committing)
pnpm doctor             # react-doctor
pnpm clean              # wipe node_modules + .expo
```

There is no test runner configured.

## Project structure

```
foodie/
├── app.json                # Expo config (typedRoutes, reactCompiler, glass effect)
├── metro.config.js         # withNativewind(...) wrapper
├── postcss.config.mjs      # @tailwindcss/postcss
├── nativewind-env.d.ts     # generated — do not edit
├── assets/                 # fonts, icons, splash, images
└── src/
    ├── global.css          # Tailwind v4 entry + theme tokens
    ├── app/                # expo-router file-based routes (see below)
    ├── components/
    │   ├── theme-provider.tsx
    │   ├── theme-toggle.tsx
    │   └── ui/
    │       ├── screen.tsx              # safe-area screen wrapper
    │       ├── themed-text.tsx
    │       ├── themed-view.tsx
    │       ├── glass-tab-bar.tsx       # custom tab bar using expo-glass-effect
    │       ├── tab-bar-background.tsx
    │       ├── tab-bar-icon.tsx
    │       ├── skeleton.tsx
    │       └── spinner.tsx
    └── lib/
        ├── theme.ts          # design tokens + useThemeColor hook
        ├── cart-context.tsx  # cart state (provider + hook)
        ├── data.ts           # mock restaurants / dishes / orders
        ├── fonts.ts          # useAppFonts (Inter, Manrope, Playfair)
        └── cn.ts             # tailwind-merge + clsx helper
```

### Path aliases (`tsconfig.json`)

- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

## Routing & screens

Entry is `expo-router/entry`. The root `Stack` mounts a **Drawer**, which mounts a **Tab bar**, which mounts a nested **Home stack**.

```
src/app/
├── _layout.tsx                       # Root Stack + ThemeProvider + CartProvider + font gate
├── onboarding.tsx                    # First-run onboarding
├── showcase.tsx                      # Component / token showcase (dev only)
└── (drawer)/
    ├── _layout.tsx                   # Drawer navigator
    ├── settings.tsx                  # Drawer › Settings
    ├── help.tsx                      # Drawer › Help
    ├── logout.tsx                    # Drawer › Logout
    └── (tabs)/
        ├── _layout.tsx               # Tabs navigator with GlassTabBar
        ├── search.tsx                # Tab › Search
        ├── orders.tsx                # Tab › Orders
        ├── profile.tsx               # Tab › Profile
        └── (home)/
            ├── _layout.tsx           # Inner Stack (header shown)
            ├── index.tsx             # Home feed (restaurants, categories)
            ├── restaurant/[id].tsx   # Restaurant detail (menu, add to cart)
            └── cart.tsx              # Cart / checkout
```

### Screen summary

| Route | Purpose |
| --- | --- |
| `/onboarding` | Intro screens shown before entering the main app |
| `/showcase` | Internal visual sandbox for theme tokens and UI primitives |
| `(drawer)/(tabs)/(home)` | **Home** — restaurant feed, categories, featured items |
| `(drawer)/(tabs)/(home)/restaurant/[id]` | Restaurant detail and menu; items can be added to the cart |
| `(drawer)/(tabs)/(home)/cart` | Current cart contents and checkout summary |
| `(drawer)/(tabs)/search` | Search restaurants and dishes |
| `(drawer)/(tabs)/orders` | Order history / live order state |
| `(drawer)/(tabs)/profile` | User profile and preferences |
| `(drawer)/settings` | App settings (theme toggle, etc.) |
| `(drawer)/help` | Help / support |
| `(drawer)/logout` | Sign‑out action |

## Theming & styling

- Light/dark tokens are defined in `src/lib/theme.ts` and consumed via `useThemeColor("background" | "surface" | "primary" | …)`.
- `ThemeProvider` wraps the app at the root layout; `ThemeToggle` flips between light and dark.
- Tailwind v4 is CSS‑configured in `src/global.css` (imported from `src/app/_layout.tsx`). NativeWind v5 is wired through `metro.config.js` via `withNativewind(config)`.
- The tab bar uses `expo-glass-effect` for a translucent iOS‑style appearance (`components/ui/glass-tab-bar.tsx`).
- Fonts: Inter (UI), Manrope (body), Playfair Display (display) — loaded with `useAppFonts` and the splash screen is held until fonts resolve.

## State

- **Cart** — `src/lib/cart-context.tsx` exposes a `CartProvider` (mounted in the root layout) and a hook used from restaurant detail and cart screens.
- **Mock data** — `src/lib/data.ts` provides restaurants, dishes, and orders consumed by the feed, detail, search, and orders screens. There is no backend integration yet.

## NativeWind v5 notes

NativeWind v5 is a **preview** with a different API from v4:

- `className` works on RN primitives via the Metro/PostCSS pipeline; the `styled()` HOC from `nativewind` is also available.
- `nativewind-env.d.ts` references `react-native-css/types` and is generator output — keep it committed, do not hand‑edit.
- There is intentionally **no `tailwind.config.js`** — Tailwind v4 uses CSS‑based config in `src/global.css`.

## Housekeeping

Run before committing:

```bash
npx expo install --check
npx -y expo-doctor
pnpm check
```
