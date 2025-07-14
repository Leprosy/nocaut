import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, type ViewProps } from "react-native";
import { ThemedText } from "../ThemedText";

export type ThemedButtonProps = ViewProps & {
  label: string;
  onPress: () => void;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({ label, onPress, lightColor, darkColor, ...otherProps }: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "button");
  const shadowColor = useThemeColor({ light: lightColor, dark: darkColor }, "shadow");

  return (
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
  );
}
