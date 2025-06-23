import { DiceComponent } from "@/components/game/Die";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dice, Die } from "@/lib/Die";
import { executeWait } from "@/lib/Utils";
import { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { ROUND_POINTS } from "../context/GameState/constants";
import { useGameStateContext } from "../context/GameState/GameState";
import { GameStatus } from "../context/GameState/types";

export default function Index() {
  const {
    state: { round, hand, maxHand, roll, maxRoll, score, status },
    dispatch,
  } = useGameStateContext();

  const [dice, setDice] = useState<Die[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const DELAY = 2000;

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

  const scoreHand = async () => {
    if (dice.length > 0) {
      const handData = Dice.getHand(dice);
      console.log(handData);
      let points = 0;
      //let log = [];

      // Hand
      await executeWait(() => setLog([...log, "You got " + handData.name]), DELAY);

      // Base
      points += handData.base;
      await executeWait(() => setLog([...log, "Base " + handData.base]), DELAY);

      // Dice
      const scored = dice.filter((i, j) => handData.scoredDie.indexOf(j) >= 0);
      scored.forEach((die) => (points += die.value === 1 ? 10 : die.value));
      await executeWait(
        () => setLog([...log, scored.map((die) => (die.value === 1 ? 10 : die.value)).join("+")]),
        DELAY
      );

      // Mult
      points *= handData.mult;
      await executeWait(() => setLog([...log, "X " + handData.mult]), DELAY);

      // Total
      await executeWait(() => setLog([...log, "TOTAL : " + points]), DELAY);

      dispatch({ type: "setScore", payload: score + points });
      dispatch({ type: "hand" });
      cleanUp();
    }
  };

  const cleanUp = () => {
    setSelected([]);
    setLog([]);
    setDice([]);
  };

  return (
    <ThemedView style={[styles.titleContainer, { flexDirection: "column", gap: 10 }]}>
      <ThemedView style={{ flexDirection: "column", alignItems: "center", gap: 20 }}>
        <ThemedText type="subtitle">{status === GameStatus.DEAD ? "Game Over" : "Round " + round}</ThemedText>
        <ThemedText type="subtitle">
          Score: {score}/{ROUND_POINTS * round}
        </ThemedText>

        <ThemedView style={{ flexDirection: "row", gap: 5 }}>
          <Button
            disabled={!(maxRoll - roll)}
            onPress={() => {
              rollDice();
              dispatch({ type: "roll" });
            }}
            title="Roll"
          />

          <Button
            disabled={!!log.length}
            onPress={() => {
              scoreHand();
            }}
            title="Play"
          />
        </ThemedView>

        <ThemedText>Hands: {maxHand - hand}</ThemedText>
        <ThemedText>Rolls: {maxRoll - roll}</ThemedText>
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

        {!!log.length && (
          <>
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
