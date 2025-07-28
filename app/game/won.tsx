import { Card, Typo } from "@/components/ui";

export default function Won() {
  return (
    <Card main dir="column" align="center" justify="center" color="bg">
      <Typo type="subtitle">ROUND OVER!</Typo>
      <Typo onPress={() => console.log("oaw")} type="link">
        Play next round
      </Typo>
    </Card>
  );
}
