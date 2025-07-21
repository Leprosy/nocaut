import { Card, Typo } from "@/components/ui";
import { StyleSheet } from "react-native";

export default function Details() {
  return (
    <>
      <Card style={styles.titleContainer}>
        <Typo type="title">Game Details tab</Typo>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
