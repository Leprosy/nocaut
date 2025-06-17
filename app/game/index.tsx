import { DiceComponent } from "@/components/game/Die";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dice, Die } from "@/lib/Die";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";

export default function Index() {
  const [dice, setDice] = useState<Die[]>([]);
  const [hand, setHand] = useState<string>("");
  const [selected, setSelected] = useState<number[]>([]);

  const roll = () => {
    const newDice = Array(5);
    for (let i = 0; i < 5; ++i) {
      if (selected.indexOf(i) < 0) {
        newDice[i] = new Die();
      } else {
        newDice[i] = dice[i];
      }
    }

    setDice(newDice);
  };

  useEffect(() => {
    roll();
  }, []);

  useEffect(() => {
    if (dice.length > 0) setHand(Dice.getHand(dice));
  }, [dice]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
    >
      <ThemedView style={[styles.titleContainer, { flexDirection: "column" }]}>
        <ThemedText type="title">Game Home tab</ThemedText>
        <Button
          onPress={() => {
            roll();
          }}
          title="Roll!"
        />

        <ThemedText>Hand: {hand}</ThemedText>
        <ThemedText>Selected: {JSON.stringify(selected)}</ThemedText>

        <DiceComponent
          dice={dice}
          onPress={(i: number) => {
            const index = selected.indexOf(i);
            if (index < 0) {
              setSelected([...selected, i]);
            } else {
              setSelected([...selected.filter((j: number) => i !== j)]);
            }
          }}
        />
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
