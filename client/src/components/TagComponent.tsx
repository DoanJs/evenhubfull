import React, { ReactNode } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { globalStyles } from "../styles/gloabalStyles";
import TextComponent from "./TextComponent";
import { appColor } from "../constants/appColor";
import { fontFamilies } from "../constants/fontFamilies";

interface Props {
  onPress: () => void;
  label: string;
  icon?: ReactNode;
  textColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

const TagComponent = (props: Props) => {
  const { onPress, label, icon, textColor, bgColor, styles } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        globalStyles.tag,
        {
          backgroundColor: bgColor ? bgColor : appColor.white,
        },
        styles,
      ]}
    >
      {icon && icon}
      <TextComponent
        font={fontFamilies.medium}
        text={label}
        styles={{ marginLeft: icon ? 8 : 0 }}
        color={textColor ? textColor : bgColor ? appColor.white : appColor.gray}
      />
    </TouchableOpacity>
  );
};

export default TagComponent;
