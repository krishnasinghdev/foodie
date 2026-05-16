import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-gesture-handler";
import { useEffect } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { useAppFonts } from "@/lib/fonts";

import "@/global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useAppFonts();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ThemeProvider>
      <Stack initialRouteName="onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="showcase" />
      </Stack>
    </ThemeProvider>
  );
}
