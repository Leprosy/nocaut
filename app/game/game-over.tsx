import { Card, Typo } from "@/components/ui";
import { Link } from "expo-router";

export default function GameOver() {
  return (
    <Card main dir="column" align="center" justify="center" color="bg">
      <Typo type="subtitle">GAME OVER!</Typo>
      <Link href="/">
        <Typo type="link">Go to home</Typo>
      </Link>
    </Card>
  );
}
