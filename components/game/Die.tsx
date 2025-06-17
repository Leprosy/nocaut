import { Die } from "@/lib/Die";
import { useState } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export function DieComponent({ die, onPress }: { die: Die; onPress: Function }) {
  const [selected, setSelected] = useState(false);

  return (
    <ThemedView
      lightColor="#fff"
      darkColor="#333"
      style={{
        borderWidth: 2,
        borderColor: selected ? "#f00" : "#000",
        borderRadius: 5,
        padding: 5,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemedText
        onPress={() => {
          onPress();
          setSelected(!selected);
        }}
        lightColor="#000"
        darkColor="#fff"
      >
        {die.value}
      </ThemedText>
    </ThemedView>
  );
}

export function DiceComponent({ dice, onPress }: { dice: Die[]; onPress: Function }) {
  return (
    <ThemedView style={{ backgroundColor: "#00f", flex: 1, padding: 5, gap: 5, flexDirection: "row" }}>
      {dice.map((die: Die, i: number) => (
        <DieComponent key={i} die={die} onPress={() => onPress(i)} />
      ))}
    </ThemedView>
  );
}
