import { Colors } from "@/constants/Colors";
import { Pressable, type ViewProps } from "react-native";
import { Typo } from "./Typo";

export type ButtonProps = ViewProps & {
  label: string;
  color?: keyof typeof Colors;
  disabled?: boolean;
  onPress: () => void;
};

export function Button({ label, disabled = false, onPress, color, ...otherProps }: ButtonProps) {
  const backgroundColor = Colors[color || "info"];
  const shadowColor = Colors.shadow;

  return !disabled ? (
    <Pressable
      onPressOut={() => onPress()}
      style={({ pressed }) => [
        {
          padding: 4,
          boxShadow: pressed ? "" : "2px 2px " + shadowColor,
          top: pressed ? 2 : 0,
          left: pressed ? 2 : 0,
          backgroundColor: pressed ? shadowColor : backgroundColor,
        },
      ]}
      {...otherProps}
    >
      <Typo type="button">{label}</Typo>
    </Pressable>
  ) : (
    <Pressable style={{ backgroundColor: shadowColor, padding: 4, top: 1, left: 1 }}>
      <Typo type="button">{label}</Typo>
    </Pressable>
  );
}
