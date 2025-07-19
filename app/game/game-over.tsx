import { Card, Typo } from "@/components/ui";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function GameOver() {
  return (
    <Card style={[styles.mainContainer]}>
      <Typo type="subtitle">GAME OVER!</Typo>
      <Link href="/">
        <Typo type="link">Go to home</Typo>
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
