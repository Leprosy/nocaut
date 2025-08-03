import { DiceComponent } from "@/components/game/Die";
import { Button, Card, Typo } from "@/components/ui";
import { DISPLAY_DELAY } from "@/constants/Values";
import { ROUND_POINTS } from "@/context/GameState/constants";
import { GameStatus } from "@/context/GameState/types";
import { useAudioPlayer } from "expo-audio";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useGameStateContext } from "../../context/GameState/GameState";

const rolla = require("@/assets/audio/roll1.mp3");
const claps = require("@/assets/audio/claps.mp3");

export default function Index() {
  const {
    state: { round, hand, maxHand, roll, maxRoll, score, status },
    dispatch,
  } = useGameStateContext();

  const rollPlayer = useAudioPlayer(rolla);
  const clapsPlayer = useAudioPlayer(claps);
  const router = useRouter();
  const [log, setLog] = useState<string[]>([]);
  const [onFinish, setOnFinish] = useState<Function>();

  const playHand = () => {
    dispatch({
      type: "playHand",
      payload: (data: any) => {
        console.log("hand", data);

        // REFACTOR THIS CRAP
        setTimeout(() => {
          const fn = () => {
            dispatch({ type: "setScore", payload: score + data.points });
            dispatch({ type: "hand" });
            setLog([]);
          };
          setLog(data.log);
          setOnFinish(() => fn);
        }, 100);
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
        router.replace("/game-over");
        break;

      case GameStatus.WON:
        clapsPlayer.play();
        dispatch({ type: "round" });
        router.replace("/won");
        break;
    }
  }, [status, router, dispatch]);

  useEffect(() => {
    console.log("game index mount");
    return () => console.log("game index iunmount");
  }, []);

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
                disabled={log.length > 0 || !(maxRoll - roll)}
                onPress={async () => {
                  await rollPlayer.seekTo(0);
                  rollPlayer.play();
                  dispatch({ type: "roll" });
                }}
                label="Roll"
              />
              <Button disabled={log.length > 0 || roll === 0} onPress={() => playHand()} label="Play" />
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
        <Log data={log} onFinish={onFinish} />
      </Card>
    </Card>
  );
}

const Log = ({ data, onFinish }: { data: string[]; onFinish?: Function }) => {
  const [msgs, setMsgs] = useState<string[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      console.log("Log: useEffect props", data, onFinish?.toString());
      setMsgs(data);
    }
  }, [data, onFinish]);

  useEffect(() => {
    if (msgs.length > 1) {
      setTimeout(() => setMsgs(msgs.slice(1)), DISPLAY_DELAY);
    } else if (msgs.length === 1 && data.length > 0) {
      setTimeout(() => {
        setMsgs([]);
        onFinish?.();
      }, DISPLAY_DELAY);
    }
  }, [msgs, onFinish]);

  return (
    <Typo type="subtitle" color="info" style={{ textAlign: "center" }}>
      {msgs.at(0)}
    </Typo>
  );
};
