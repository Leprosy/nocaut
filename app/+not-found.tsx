import { Card, Typo } from "@/components/ui";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Card style={styles.container}>
        <Typo type="title">This screen does not exist.</Typo>
        <Link href="/" style={styles.link}>
          <Typo type="link">Go to home screen!</Typo>
        </Link>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
