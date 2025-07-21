import { DiceComponent } from "@/components/game/Die";
import { Button, Card, Typo } from "@/components/ui";
import { DISPLAY_DELAY } from "@/constants/Values";
import { ROUND_POINTS } from "@/context/GameState/constants";
import { GameStatus } from "@/context/GameState/types";
import { Dice, Die } from "@/lib/Die";
import { executeWait } from "@/lib/Utils";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
    <Card main color="bg" dir="column">
      <Card dir="column" style={{ flex: 1 }}>
        <Typo type="subtitle" style={{ textAlign: "center" }}>
          Round {round}
        </Typo>

        <Card dir="row">
          <Card dir="column" align="center">
            <Typo color="success">
              Score: {score}/{ROUND_POINTS * round}
            </Typo>

            <Card dir="row">
              <Button
                disabled={!(maxRoll - roll)}
                onPress={() => {
                  rollDice();
                  dispatch({ type: "roll" });
                }}
                label="Roll"
              />

              <Button
                disabled={!dice.length || !!log.length}
                onPress={() => {
                  scoreHand();
                }}
                label="Play"
              />
            </Card>
          </Card>

          <Card dir="column">
            <Typo color="warning">Hands: {maxHand - hand}</Typo>
            <Typo color="warning">Rolls: {maxRoll - roll}</Typo>
          </Card>
        </Card>
      </Card>

      <Card dir="column" style={{ flex: 2 }}>
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
      </Card>

      <Card dir="column" style={{ flex: 1 }}>
        {!!log.length && (
          <>
            {log.map((item, i) => (
              <Typo key={i} type="default" color="info" style={{ textAlign: "center" }}>
                {item}
              </Typo>
            ))}
          </>
        )}
      </Card>
    </Card>
  );
}
