import { DiceComponent } from "@/components/game/Die";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dice, Die } from "@/lib/Die";
import { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";

export default function Index() {
  const [round, setRound] = useState(1);
  const [hand, setHand] = useState(0);
  const [roll, setRoll] = useState(0);
  const [dice, setDice] = useState<Die[]>([]);
  const [score, setScore] = useState(0);

  const [handName, setHandName] = useState<string>("");
  const [log, setLog] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const [hasPlayed, setHasPlayed] = useState(false);
  const [isDead, setIsDead] = useState(false);

  const roundValue = 500;
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
      scored.forEach((die) => (points += die.value === 1 ? 10 : die.value));
      log.push(scored.map((die) => (die.value === 1 ? 10 : die.value)).join("+"));

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

  useEffect(() => {
    console.log(hand);

    // Scored
    if (score >= roundValue * round) {
      console.log("You won");
      setIsDead(true);
    } else {
      // Busted
      if (hand >= maxHands) {
        console.log("You are dead!");
        setIsDead(true);
      }
    }
  }, [hand]);

  return (
    <ThemedView style={[styles.titleContainer, { flexDirection: "column", gap: 10 }]}>
      <ThemedView style={{ flexDirection: "column", alignItems: "center", gap: 20 }}>
        <ThemedText type="subtitle">{isDead ? "Game Over" : "Round " + round}</ThemedText>
        <ThemedText type="subtitle">
          Score: {score}/{round * roundValue}
        </ThemedText>

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
            title="Play"
          />
        </ThemedView>

        <ThemedText>Hands: {maxHands - hand}</ThemedText>
        <ThemedText>Rolls: {maxRolls - roll}</ThemedText>
      </ThemedView>

      <ThemedView>
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
    </ThemedView>
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
