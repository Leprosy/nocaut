import { Card, Typo } from "@/components/ui";
import { useGameStateContext } from "@/context/GameState/GameState";
import { getRandomPerks } from "@/lib/Perks";
import { Perk } from "@/lib/types";
import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

const audioSource = require("../assets/audio/claps.mp3");

export default function Won() {
  const player = useAudioPlayer(audioSource);
  const [ready, setReady] = useState(false);
  const {
    dispatch,
    state: { perks },
  } = useGameStateContext();
  const newPerks = getRandomPerks(
    3,
    perks.map((item) => item.id)
  );

  const onPress = (perk: Perk) => {
    dispatch({ type: "addPerk", payload: perk });
    setReady(true);
  };

  useEffect(() => {
    console.log("won render");
    player.play();
    return () => console.log("won unmount");
  }, []);

  return (
    <Card main dir="column" align="center" justify="center" color="bg">
      <Typo type="subtitle">ROUND OVER!</Typo>
      {!ready && (
        <>
          <Typo>Choose a perk</Typo>
          {newPerks.map((perk, i) => (
            <TouchableOpacity activeOpacity={0.6} key={i} onPress={() => onPress(perk)}>
              <Card dir="column" align="center" color="bg2">
                <Typo color="warning">{perk.name}</Typo>
                <Typo type="small" color="success">
                  {perk.description}
                </Typo>
              </Card>
            </TouchableOpacity>
          ))}
        </>
      )}

      {ready && (
        <Typo onPress={() => router.replace("/game")} type="link">
          Play next round
        </Typo>
      )}
    </Card>
  );
}
