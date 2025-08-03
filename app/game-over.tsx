import { Card, Typo } from "@/components/ui";
import { useAudioPlayer } from "expo-audio";
import { Link } from "expo-router";
import { useEffect } from "react";

const audioSource = require("../assets/audio/dead.mp3");

export default function GameOver() {
  const player = useAudioPlayer(audioSource);

  useEffect(() => {
    console.log("gameover render");
    player.play();
    return () => console.log("gameover unmount");
  }, []);

  return (
    <Card main dir="column" align="center" justify="center" color="bg">
      <Typo type="subtitle">GAME OVER!</Typo>
      <Link replace href="/">
        <Typo type="link">Go to home</Typo>
      </Link>
    </Card>
  );
}
