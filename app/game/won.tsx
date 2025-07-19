import { Card, Typo } from "@/components/ui";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function GameOver() {
  return (
    <Card style={[styles.mainContainer]}>
      <Typo type="subtitle">ROUND OVER</Typo>
      <Link href="/game">
        <Typo type="link">Play next round</Typo>
      </Link>
    </Card>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
