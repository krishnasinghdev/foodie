# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Expo SDK 56 (preview/beta)** with `expo-router` ~56 (file-based routing, `typedRoutes` + `reactCompiler` experiments enabled in `app.json`).
- **React 19.2** / **React Native 0.85** / **react-native-web** ~0.21.
- **NativeWind v5 preview** (`nativewind@5.0.0-preview.3`) on top of **Tailwind CSS v4** (`@tailwindcss/postcss`). NativeWind v5 ships `react-native-css` (see `nativewind-env.d.ts` — generated, do not edit). There is intentionally no `tailwind.config.js`: Tailwind v4 is configured via CSS / PostCSS, and NativeWind is wired through `metro.config.js` via `withNativewind(config)`.
- **pnpm** is the package manager (`pnpm-workspace.yaml`, `pnpm-lock.yaml`). `nodeLinker: hoisted` is required for Metro/Expo to resolve dependencies correctly.
- **oxlint + oxfmt** (not eslint/prettier) for linting and formatting. `expo lint` is also wired.

## Commands

- `pnpm start` — Expo dev server (`expo start`)
- `pnpm ios` / `pnpm android` / `pnpm web` — start with a target platform
- `pnpm lint` — `expo lint`
- `pnpm check` — `oxlint --fix --fix-suggestions && oxfmt --write` (run this before committing)
- `pnpm clean` — wipe `node_modules` and `.expo`

There is no test runner configured.

## Architecture

- **Entry point** is `expo-router/entry` (set in `package.json` `main`). Routes live under `src/app/` using expo-router's file-based convention.
- **Root layout** `src/app/_layout.tsx` is a `Stack` with `headerShown: false`.
- **Tab group** `src/app/(tabs)/` (`index`, `search`, `order`, `profile`) is nested inside the root stack via the `(tabs)/_layout.tsx` `Tabs` navigator.
- **Path aliases** (`tsconfig.json`): `@/*` → `./src/*`, `@/assets/*` → `./assets/*`.
- **Intended app shape** (from `README.md`, not yet implemented): Auth flow (Login/Signup) → Main app with Onboarding, bottom Tabs (Home(Index) with a nested Restaurant stack → Detail → Cart, Search, Orders, Profile), plus a Drawer (My Orders, Settings, Help, Logout).

## NativeWind v5 notes

- v5 is a **preview** and its API differs from v4. The current code uses the `styled()` HOC from `nativewind` (see `src/app/index.tsx`) — `className` directly on RN primitives is also supported via the Metro/PostCSS pipeline.
- Styling pipeline: `postcss.config.mjs` loads `@tailwindcss/postcss`; `metro.config.js` wraps the Expo Metro config with `withNativewind`. There is **no `tailwind.config.js`** — Tailwind v4 uses CSS-based config. A `src/global.css` was present in the initial commit but has been removed in the working tree; if you reintroduce one, import it from the root layout.
- `nativewind-env.d.ts` references `react-native-css/types` — keep it committed; it is generator output.

## Conventions

- Format/lint with `pnpm check` (oxfmt uses 2-space indent and double quotes, matching the existing files).
- This is an Expo SDK 56 **beta** project — when looking up APIs, prefer the SDK 56 docs / source over older guides; some packages (e.g. `@expo/ui`, `expo-glass-effect`, `expo-symbols`) are new or platform-specific.
