import React, { ReactNode } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { globalStyles } from "../styles/gloabalStyles";
import { appColor } from "../constants/appColor";

interface Props {
  onPress?: () => void;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  isShadow?: boolean;
  color?: string;
}

const CardComponent = (props: Props) => {
  const { onPress, children, styles, isShadow, color } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.card,
        isShadow ? globalStyles.shadow : {},
        {
          backgroundColor: color ?? appColor.white,
        },
        styles,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;
