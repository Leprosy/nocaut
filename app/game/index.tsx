import { DiceComponent } from "@/components/game/Die";
import { Button, Card, Typo } from "@/components/ui";
import { ROUND_POINTS } from "@/context/GameState/constants";
import { GameStatus } from "@/context/GameState/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useGameStateContext } from "../../context/GameState/GameState";

export default function Index() {
  const {
    state: { round, hand, maxHand, roll, maxRoll, score, status },
    dispatch,
  } = useGameStateContext();

  const router = useRouter();
  const [log, setLog] = useState<string[]>([]);

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
  }, [status, router, dispatch]);

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
              <Button disabled={!(maxRoll - roll)} onPress={() => dispatch({ type: "roll" })} label="Roll" />
              <Button
                disabled={roll === 0}
                onPress={() =>
                  dispatch({
                    type: "playHand",
                    payload: (data: any) => console.log("hand", data),
                  })
                }
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
        <DiceComponent />
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
