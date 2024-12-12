import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { appColor } from "../constants/appColor";
import { StyleProp } from "react-native";

interface Props {
  size?: number;
  children: ReactNode;
  color?: string;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
  disable?: boolean
}

const CircleComponent = (props: Props) => {
  const { size, children, color, onPress, styles, disable } = props;
  const styleLocal: any = [
    {
      width: size ?? 40,
      height: size ?? 40,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color ?? appColor.primary,
    },
    styles,
  ];
  return onPress ? (
    <TouchableOpacity style={styleLocal} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity disabled={disable} style={styleLocal}>{children}</TouchableOpacity>
  );
};

export default CircleComponent;
