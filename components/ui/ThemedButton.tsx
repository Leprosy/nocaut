import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, type ViewProps } from "react-native";
import { ThemedText } from "../ThemedText";

export type ThemedButtonProps = ViewProps & {
  label: string;
  disabled?: boolean;
  onPress: () => void;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  label,
  disabled = false,
  onPress,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "button");
  const shadowColor = useThemeColor({ light: lightColor, dark: darkColor }, "shadow");

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
      <ThemedText type="button">{label}</ThemedText>
    </Pressable>
  ) : (
    <Pressable style={{ backgroundColor: shadowColor, padding: 4, top: 1, left: 1 }}>
      <ThemedText type="button">{label}</ThemedText>
    </Pressable>
  );
}
