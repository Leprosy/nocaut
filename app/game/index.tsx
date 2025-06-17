import { DiceComponent } from "@/components/game/Die";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dice, Die } from "@/lib/Die";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";

export default function Index() {
  const [hand, setHand] = useState(0);
  const [roll, setRoll] = useState(0);
  const [dice, setDice] = useState<Die[]>([]);
  const [score, setScore] = useState(0);
  const [handName, setHandName] = useState<string>("");
  const [selected, setSelected] = useState<number[]>([]);

  const maxRolls = 2;
  const maxHands = 4;

  const rollDice = () => {
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
    rollDice();
  }, []);

  useEffect(() => {
    if (dice.length > 0) setHandName(Dice.getHand(dice));
  }, [dice]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
    >
      <ThemedView style={[styles.titleContainer, { flexDirection: "column" }]}>
        <ThemedText type="title">Game Home tab</ThemedText>
        <ThemedView style={{ flexDirection: "row", gap: 5 }}>
          <Button
            onPress={() => {
              if (roll < maxRolls) {
                rollDice();
                setRoll(roll + 1);
              }
            }}
            title="Roll"
          />
          <Button
            onPress={() => {
              if (roll < maxHands) {
                setRoll(0);
                setHand(hand + 1);
              }
            }}
            title="Play Hand"
          />
        </ThemedView>

        <ThemedView style={{ flexDirection: "row", gap: 5 }}>
          <ThemedText>Hands: {maxHands - hand}</ThemedText>
          <ThemedText>Rolls: {maxRolls - roll}</ThemedText>
        </ThemedView>

        <ThemedText type="title">Score: {score}</ThemedText>
        <ThemedText>You got: {handName}</ThemedText>
        {/* <ThemedText>Selected: {JSON.stringify(selected)}</ThemedText> */}

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
