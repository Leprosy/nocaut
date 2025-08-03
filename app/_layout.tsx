import { GameStateProvider } from "@/context/GameState/GameState";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    Title: require("../assets/fonts/title.ttf"),
    Font: require("../assets/fonts/font.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GameStateProvider>
      <Stack />
      <StatusBar style="auto" />
    </GameStateProvider>
  );
}
