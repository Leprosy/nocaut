import { HelloWave } from "@/components/HelloWave";
import { Card, Typo } from "@/components/ui";
import { Platform, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <>
      <Card style={styles.titleContainer}>
        <Typo type="title">Game Welcome!</Typo>
        <HelloWave />
      </Card>
      <Card style={styles.stepContainer}>
        <Typo type="subtitle">Step 1: Try it</Typo>
        Edit <Typo type="defaultSemiBold">app/(tabs)/index.tsx</Typo> to see changes. Press{" "}
        <Typo type="defaultSemiBold">
          {Platform.select({
            ios: "cmd + d",
            android: "cmd + m",
            web: "F12",
          })}
          to open developer tools.
        </Typo>
      </Card>
      <Card style={styles.stepContainer}>
        <Typo type="subtitle">Step 2: Explore</Typo>
        <Typo>{`Tap the Explore tab to learn more about what's included in this starter app.`}</Typo>
      </Card>
      <Card style={styles.stepContainer}>
        <Typo type="subtitle">Step 3: Get a fresh start</Typo>
        <Typo>
          {`When you're ready, run `}
          <Typo type="defaultSemiBold">npm run reset-project</Typo> to get a fresh{" "}
          <Typo type="defaultSemiBold">app</Typo> directory. This will move the current{" "}
          <Typo type="defaultSemiBold">app</Typo> to <Typo type="defaultSemiBold">app-example</Typo>.
        </Typo>
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
