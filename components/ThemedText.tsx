import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "button";
};

export function ThemedText({ style, lightColor, darkColor, type = "default", ...rest }: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <Text style={[{ fontFamily: "Font", color }, styles[type] || undefined, style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    lineHeight: 42,
    textShadowColor: "#666",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  button: {
    fontSize: 12,
    lineHeight: 20,
  },
});
