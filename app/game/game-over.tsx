import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function GameOver() {
  return (
    <ThemedView style={[styles.mainContainer]}>
      <ThemedText type="subtitle">GAME OVER!</ThemedText>
      <Link href="/">
        <ThemedText type="link">Go to home</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
