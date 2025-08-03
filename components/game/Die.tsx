import { Colors } from "@/constants/Colors";
import { useGameStateContext } from "@/context/GameState/GameState";
import { Die } from "@/lib/Die";
import { useEffect } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "../ui";
import { getErrorAnimation, getFlipAnimation, getRollAnimation } from "./DieAnim";

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
  const [rotate, rollAnimation] = getRollAnimation();
  const [scale, flipAnimation] = getFlipAnimation();
  const [translateX, errorAnimation] = getErrorAnimation();

  useEffect(() => {
    console.log("new", die);

    if (die.anim === "flip") {
      flipAnimation.reset();
      flipAnimation.start();
    } else {
      rollAnimation.reset();
      rollAnimation.start();
    }
  }, [die]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress()}
      onLongPress={() => {
        // HACK onLongPress return false if not valid and undefined if it is xd
        if (onLongPress() !== false) {
          console.log("flip");
          flipAnimation.reset();
          flipAnimation.start();
        } else {
          console.log("error");
          errorAnimation.reset();
          errorAnimation.start();
        }
      }}
    >
      <Animated.View
        style={{
          transform: [{ rotate }, { scale }, { translateX }],
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
