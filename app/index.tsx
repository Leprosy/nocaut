import { HelloWave } from "@/components/HelloWave";
import { Card, Typo } from "@/components/ui";
import { LSPACING } from "@/components/ui/constants";
import { Link, Stack } from "expo-router";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Fuck you!", statusBarStyle: "dark" }} />

      <Card main color="bg" dir="column" align="center" justify="center" gap={LSPACING * 8}>
        <Typo type="title">Nocaut!</Typo>

        <Card dir="column" align="center">
          <Link href={"/game"}>
            <Typo type="subtitle" color="info">
              Start New Run <HelloWave />
            </Typo>
          </Link>

          <Link href={"/credits"}>
            <Typo type="subtitle" color="success">
              Credits
            </Typo>
          </Link>
        </Card>
      </Card>
    </>
  );
}
