import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Fuck you!" }} />

      <ThemedView style={[styles.mainContainer]}>
        <ThemedText type="title">Nocaut!</ThemedText>

        <ThemedView style={[styles.menuContainer]}>
          <Link href={"/game"}>
            <ThemedText type="subtitle">Start New Run</ThemedText>
          </Link>

          <Link href={"/credits"}>
            <ThemedText type="subtitle">Credits</ThemedText>
          </Link>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    height: "100%",
  },
  menuContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
});
