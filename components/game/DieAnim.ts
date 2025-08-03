import { Animated, Easing } from "react-native";

type getAnimResponse = [Animated.AnimatedInterpolation<string | number>, Animated.CompositeAnimation];

export const getRollAnimation = (): getAnimResponse => {
  const d = new Animated.Value(0);
  const value = d.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return [
    value,
    Animated.timing(d, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ];
};

export const getFlipAnimation = (): getAnimResponse => {
  const d = new Animated.Value(0);
  const value = d.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.25],
  });

  return [
    value,
    Animated.sequence([
      Animated.timing(d, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(d, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
  ];
};

export const getErrorAnimation = (): getAnimResponse => {
  const d = new Animated.Value(0);
  const value = d.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-5, 0, 5],
  });

  return [
    value,
    Animated.sequence([
      Animated.timing(d, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(d, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
  ];
};
