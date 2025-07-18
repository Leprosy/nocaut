import { DiceComponent } from "@/components/game/Die";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { DISPLAY_DELAY } from "@/constants/constants";
import { ROUND_POINTS } from "@/context/GameState/constants";
import { GameStatus } from "@/context/GameState/types";
import { Dice, Die } from "@/lib/Die";
import { executeWait } from "@/lib/Utils";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useGameStateContext } from "../../context/GameState/GameState";

export default function Index() {
  const {
    state: { round, hand, maxHand, roll, maxRoll, score, status },
    dispatch,
  } = useGameStateContext();

  const router = useRouter();
  const [dice, setDice] = useState<Die[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

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

      // Hand
      await executeWait(() => setLog([...log, "You got " + handData.name]), DISPLAY_DELAY);

      // Base
      points += handData.base;
      await executeWait(() => setLog([...log, "Base " + handData.base]), DISPLAY_DELAY);

      // Dice
      const scored = dice.filter((i, j) => handData.scoredDie.indexOf(j) >= 0);
      scored.forEach((die) => (points += die.value === 1 ? 10 : die.value));
      await executeWait(
        () => setLog([...log, scored.map((die) => (die.value === 1 ? 10 : die.value)).join("+")]),
        DISPLAY_DELAY
      );

      // Mult
      points *= handData.mult;
      await executeWait(() => setLog([...log, "X " + handData.mult]), DISPLAY_DELAY);

      // Total
      await executeWait(() => setLog([...log, "TOTAL : " + points]), DISPLAY_DELAY);

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

  useEffect(() => {
    switch (status) {
      case GameStatus.PLAYING:
        console.log("we are playing");
        break;

      case GameStatus.DEAD:
        dispatch({ type: "reset" });
        router.navigate("/game/game-over");
        break;

      case GameStatus.WON:
        dispatch({ type: "round" });
        router.navigate("/game/won");
        break;
    }
  }, [status, router]);

  return (
    <ThemedView style={[styles.mainContainer]}>
      <ThemedView style={[styles.hudContainer]}>
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Round {round}
        </ThemedText>

        <ThemedView style={[styles.row]}>
          <ThemedView style={[styles.col]}>
            <ThemedText>
              Score: {score}/{ROUND_POINTS * round}
            </ThemedText>

            <ThemedView style={[styles.buttonRow]}>
              <ThemedButton
                disabled={!(maxRoll - roll)}
                onPress={() => {
                  rollDice();
                  dispatch({ type: "roll" });
                }}
                label="Roll"
              />

              <ThemedButton
                disabled={!dice.length || !!log.length}
                onPress={() => {
                  scoreHand();
                }}
                label="Play"
              />
            </ThemedView>
          </ThemedView>

          <ThemedView style={[styles.col]}>
            <ThemedText>Hands: {maxHand - hand}</ThemedText>
            <ThemedText>Rolls: {maxRoll - roll}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

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

      <ThemedView style={[styles.logContainer]}>
        {!!log.length && (
          <>
            {log.map((item, i) => (
              <ThemedText key={i} type="default" style={{ textAlign: "center" }}>
                {item}
              </ThemedText>
            ))}
          </>
        )}
      </ThemedView>
    </ThemedView>
  );
}

/* <ThemedView style={[styles.titleContainer, { flexDirection: "column", gap: 10 }]}>
      <ThemedView style={[style.hudContainer]}>
        {status === GameStatus.PLAYING && (
          <>
            <ThemedText type="subtitle">Round {round}</ThemedText>
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
          </>
        )}

        {status === GameStatus.DEAD && (
          <>
            <ThemedText type="title">You Suck!</ThemedText>
            <Button onPress={() => dispatch({ type: "reset" })} title="Start Over" />
          </>
        )}

        {status === GameStatus.WON && (
          <>
            <ThemedText type="title">Round clear!</ThemedText>
            <Button onPress={() => dispatch({ type: "round" })} title="Next Round" />
          </>
        )}
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
    </ThemedView> */

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
  },

  hudContainer: {
    height: "20%",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },

  logContainer: {
    height: "20%",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },

  row: {
    flexDirection: "row",
    gap: 20,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 5,
  },

  col: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
});
