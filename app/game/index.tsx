import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dice } from "@/lib/Die";
import { Image } from "expo-image";
import { useState } from "react";
import { Button, StyleSheet } from "react-native";

export default function Index() {
  const dice = new Dice(5);
  const [roll, setRoll] = useState<string>("");
  const [hand, setHand] = useState<string>("");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Game Home tab</ThemedText>
        <Button
          onPress={() => {
            setRoll(dice.roll());
            setHand(dice.getHand());
          }}
          title="Roll!"
        />
        <ThemedView style={styles.titleContainer}>
          <ThemedText>Roll:{roll}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText>Hand:{hand}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// TODO: global styles
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
