import { Colors } from "@/constants/Colors";
import { Die } from "@/lib/Die";
import { useEffect, useState } from "react";
import { Animated, Easing, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "../ui";

export function DieComponent({ die, onPress }: { die: Die; onPress: Function }) {
  const [selected, setSelected] = useState(false);
  const angle = new Animated.Value(0);

  useEffect(() => {
    console.log("new", die);
  }, [die]);

  useEffect(
    () =>
      Animated.timing(angle, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(),
    [die]
  );

  const spin = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onLongPress={() => {
        //roll();
        console.log("flip die?");
      }}
      onPress={() => {
        onPress();
        setSelected(!selected);
      }}
    >
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
          width: 50,
          height: 50,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: selected ? "#f00" : "#000",
          borderRadius: 5,
        }}
      >
        <Image
          style={{
            width: 150,
            height: 100,
            left: -50 * ((die.value - 1) % 3),
            top: -50 * (die.value > 3 ? 1 : 0),
          }}
          source={require("@/assets/dice/default.png")}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

export function DiceComponent({ dice, onPress }: { dice: Die[]; onPress: Function }) {
  return (
    <Card style={[styles.diceContainer]}>
      {dice.map((die: Die, i: number) => (
        <DieComponent key={i} die={die} onPress={() => onPress(i)} />
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  diceContainer: {
    height: "100%",
    backgroundColor: Colors.bg2,
    gap: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
