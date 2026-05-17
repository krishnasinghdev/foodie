# Repository Guidelines

## Project Structure & Module Organization

This is an Expo Router React Native app. Routes live in `src/app/` and follow file-based routing conventions: drawer routes are under `src/app/(drawer)/`, tab routes under `src/app/(drawer)/(tabs)/`, and the home stack under `src/app/(drawer)/(tabs)/(home)/`. Reusable components live in `src/components/`, with shared primitives in `src/components/ui/`. Cross-cutting helpers and configuration such as themes, fonts, and class merging live in `src/lib/`. Static assets belong in `assets/`. Use the `@/*` alias for source imports and `@/assets/*` for assets.

## Build, Test, and Development Commands

- `pnpm start` starts the Expo dev server.
- `pnpm ios`, `pnpm android`, and `pnpm web` start Expo for a target platform.
- `pnpm lint` runs `expo lint`.
- `pnpm check` runs `oxlint --fix --fix-suggestions` and `oxfmt --write`; run it before committing.
- `pnpm clean` removes `node_modules` and `.expo` for a clean reinstall/debug cycle.

Use pnpm, not npm or yarn, because the repository includes `pnpm-lock.yaml` and `pnpm-workspace.yaml`.

## Coding Style & Naming Conventions

Code is TypeScript with `strict` enabled. Keep components small and colocate route-only UI with its route when practical; promote shared UI to `src/components/`. Use 2-space indentation and double quotes, matching `oxfmt`. Prefer functional React components and named exports for shared components/utilities. Use kebab-case filenames for components and routes such as `theme-toggle.tsx`, and use Expo Router naming for layouts (`_layout.tsx`) and dynamic routes (`[id].tsx`).

Styling uses NativeWind v5 with Tailwind CSS v4 through `src/global.css`, `postcss.config.mjs`, and `metro.config.js`. There is intentionally no `tailwind.config.js`.

## Testing Guidelines

No test runner is currently configured. For now, validate changes with `pnpm check`, `pnpm lint`, and manual Expo runs on the affected platform. If adding tests, introduce the runner and scripts in `package.json`, place tests near the code they cover, and use clear names such as `component-name.test.tsx` or `helper-name.test.ts`.

## Commit & Pull Request Guidelines

The existing history uses short, imperative commit subjects, for example `screen and route setup`. Keep commits focused and describe the user-visible or architectural change. Pull requests should include a concise summary, validation steps run, linked issues when applicable, and screenshots or screen recordings for UI changes across relevant platforms.

## Agent-Specific Instructions

Do not edit generated environment files such as `nativewind-env.d.ts` unless the toolchain regenerates them. Keep changes scoped to the requested feature or fix, and avoid unrelated refactors in navigation, styling infrastructure, or dependency versions.

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
