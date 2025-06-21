import { DiceComponent } from "@/components/game/Die";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dice, Die } from "@/lib/Die";
import { Image } from "expo-image";
import { useState } from "react";
import { Button, StyleSheet } from "react-native";

export default function Index() {
  const [hand, setHand] = useState(0);
  const [roll, setRoll] = useState(0);
  const [dice, setDice] = useState<Die[]>([]);
  const [score, setScore] = useState(0);

  const [handName, setHandName] = useState<string>("");
  const [log, setLog] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const [hasPlayed, setHasPlayed] = useState(false);

  const maxRolls = 2;
  const maxHands = 4;
  const delay = 5000;

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

  const scoreHand = () => {
    if (dice.length > 0) {
      const handData = Dice.getHand(dice);
      console.log(handData);
      let points = 0;
      let log = [];

      // Base
      points += handData.base;
      log.push("Base " + handData.base);

      // Dice
      const scored = dice.filter((i, j) => handData.scoredDie.indexOf(j) >= 0);
      scored.forEach((die) => (points += die.value));
      log.push(scored.map((die) => die.value).join("+"));

      // Mult
      points *= handData.mult;
      log.push("X " + handData.mult);

      // Total
      log.push("TOTAL : " + points);

      setHandName(handData.name);
      setScore(score + points);
      setLog(log);
    }
  };

  const cleanUp = () => {
    setHandName("");
    setSelected([]);
    setLog([]);
    setDice([]);
    setRoll(0);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
    >
      <ThemedView style={[styles.titleContainer, { flexDirection: "column" }]}>
        <ThemedText type="title">Game Home tab</ThemedText>
        <ThemedView style={{ flexDirection: "row", gap: 5 }}>
          <Button
            disabled={hasPlayed || roll >= maxRolls}
            onPress={() => {
              rollDice();
              setRoll(roll + 1);
            }}
            title="Roll"
          />

          <Button
            disabled={hasPlayed || dice.length === 0 || hand >= maxHands}
            onPress={() => {
              scoreHand();
              setHasPlayed(true);

              setTimeout(() => {
                setHand(hand + 1);
                cleanUp();
                setHasPlayed(false);
              }, delay);
            }}
            title="Play Hand"
          />
        </ThemedView>

        <ThemedView style={{ flexDirection: "row", gap: 5 }}>
          <ThemedText>Hands: {maxHands - hand}</ThemedText>
          <ThemedText>Rolls: {maxRolls - roll}</ThemedText>
        </ThemedView>

        <ThemedText type="title">Score: {score}</ThemedText>
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

        {hasPlayed && (
          <>
            <ThemedText>You got: {handName}</ThemedText>
            <ThemedText type="default">Hand scored:</ThemedText>
            {log.map((item, i) => (
              <ThemedText key={i} type="default">
                {item}
              </ThemedText>
            ))}
          </>
        )}
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
