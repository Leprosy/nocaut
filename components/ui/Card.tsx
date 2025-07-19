import { Colors } from "@/constants/Colors";
import { FlexAlignType, View, type ViewProps } from "react-native";
import { HSPACING, LSPACING } from "./constants";

export type CardProps = ViewProps & {
  color?: keyof typeof Colors;
  dir?: "row" | "column";
  main?: boolean;
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | undefined;
  align?: FlexAlignType | undefined;
  gap?: number;
};

export function Card({ color, dir, main, align, justify, gap, style, ...otherProps }: CardProps) {
  const backgroundColor = color ? Colors[color] : "";

  return (
    <View
      style={[
        {
          backgroundColor,
          padding: HSPACING,
          justifyContent: justify,
          alignItems: align,
        },
        main ? { height: "100%" } : {},
        dir ? { display: "flex", flexDirection: dir, gap: gap || LSPACING } : {},

        style,
      ]}
      {...otherProps}
    />
  );
}
