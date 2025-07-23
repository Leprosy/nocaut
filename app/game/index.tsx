import { DiceComponent } from "@/components/game/Die";
import { Button, Card, Typo } from "@/components/ui";
import { DISPLAY_DELAY } from "@/constants/Values";
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

  const playHand = () => {
    dispatch({
      type: "playHand",
      payload: (data: any) => {
        console.log("hand", data);

        // REFACTOR THIS CRAP
        setTimeout(() => {
          setLog(data.log);

          /* dispatch({ type: "setScore", payload: score + data.points });
          dispatch({ type: "hand" }); */
        }, 500);
      },
    });
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
              <Button disabled={roll === 0} onPress={() => playHand()} label="Play" />
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
        <Log data={log} />
      </Card>
    </Card>
  );
}

const Log = ({ data }: { data: string[] }) => {
  const [msgs, setMsgs] = useState<string[]>([]);

  useEffect(() => {
    console.log("useEffect data", data);
    setMsgs(data);
  }, [data]);

  useEffect(() => {
    console.log("useEffect msgs", msgs);

    if (msgs.length > 1) {
      setTimeout(() => setMsgs(msgs.slice(1)), DISPLAY_DELAY);
    }
  }, [msgs]);

  return (
    <Typo type="default" color="info" style={{ textAlign: "center" }}>
      {msgs.at(0)}
    </Typo>
  );
};
