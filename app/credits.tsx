import { Card, Typo } from "@/components/ui";

export default function HomeScreen() {
  return (
    <Card main justify="center" color="bg" dir="column">
      <Card dir="column" align="center" gap={2}>
        <Typo type="subtitle">Game code</Typo>
        <Typo type="subtitle">Leprosy</Typo>
      </Card>

      <Card dir="column" align="center" gap={2}>
        <Typo type="subtitle">Graphics</Typo>
        <Typo type="subtitle">Leprosy</Typo>
      </Card>

      <Card dir="column" align="center" gap={2}>
        <Typo type="subtitle">SFX</Typo>
        <Typo type="subtitle">Leprosy</Typo>
      </Card>
    </Card>
  );
}
