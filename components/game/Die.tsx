import { Colors } from "@/constants/Colors";
import { useGameStateContext } from "@/context/GameState/GameState";
import { Die } from "@/lib/Die";
import { useEffect } from "react";
import { Animated, Easing, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "../ui";

export function DieComponent({ die, selected, onPress }: { die: Die; selected: boolean; onPress: Function }) {
  const { dispatch } = useGameStateContext();
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
    <TouchableOpacity activeOpacity={0.6} onLongPress={() => console.log("flip die?")} onPress={() => onPress()}>
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
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
        />
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  diceContainer: {
    height: "100%",
    backgroundColor: Colors.bg2,
    gap: 40,
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
});
