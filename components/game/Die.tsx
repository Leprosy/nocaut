import { Colors } from "@/constants/Colors";
import { useGameStateContext } from "@/context/GameState/GameState";
import { Die } from "@/lib/Die";
import { useEffect, useState } from "react";
import { Animated, Easing, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "../ui";

export function DieComponent({
  die,
  selected,
  onPress,
  onLongPress,
}: {
  die: Die;
  selected: boolean;
  onPress: Function;
  onLongPress: Function;
}) {
  const [state, setState] = useState<"" | "error" | "flip">("");
  const angle = new Animated.Value(0);
  const size = new Animated.Value(0);

  useEffect(() => {
    console.log("new", die);
  }, [die]);

  useEffect(
    () =>
      Animated.timing(angle, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(),
    [die]
  );

  useEffect(
    () =>
      Animated.sequence([
        Animated.timing(size, {
          toValue: 1,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(size, {
          toValue: 0,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(),
    [die]
  );

  const spin = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const scale = size.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.25],
  });

  const anims = { spin1: { rotate: spin }, scale1: { scale: scale } };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress()}
      onLongPress={() => {
        setState("flip");
        onLongPress();
      }}
    >
      <Animated.View
        style={{
          transform: [state === "" ? anims.spin1 : anims.scale1],
          width: 60,
          height: 60,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: selected ? "#f00" : "#000",
          borderRadius: 5,
        }}
      >
        <Image
          style={{
            width: 180,
            height: 120,
            left: -60 * ((die.value - 1) % 3),
            top: -60 * (die.value > 3 ? 1 : 0),
          }}
          source={require("@/assets/dice/default.png")}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

export function DiceComponent() {
  const {
    state: { dice, selected },
    dispatch,
  } = useGameStateContext();

  return (
    <Card style={[styles.diceContainer]}>
      {dice.map((die: Die, i: number) => (
        <DieComponent
          key={i}
          selected={selected.includes(i)}
          die={die}
          onPress={() => dispatch({ type: "select", payload: i })}
          onLongPress={() => die.roll > 0 && dispatch({ type: "flip", payload: i })}
        />
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  diceContainer: {
    height: "100%",
    backgroundColor: Colors.bg2,
    gap: 50,
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
});
