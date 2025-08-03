import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, type TextProps } from "react-native";

export type TypoProps = TextProps & {
  color?: keyof typeof Colors;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "button" | "small";
};

export function Typo({ style, color, type = "default", ...rest }: TypoProps) {
  return (
    <Text
      style={[{ fontFamily: "Font", color: Colors[color || "text"] }, styles[type] || undefined, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 20,
  },
  small: {
    fontSize: 10,
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    lineHeight: 42,
    textShadowColor: Colors.shadow,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.link,
  },
  button: {
    fontSize: 12,
    lineHeight: 20,
  },
});
