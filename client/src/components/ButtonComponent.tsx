import { ReactNode } from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { appColor } from "../constants/appColor";
import { fontFamilies } from "../constants/fontFamilies";
import { globalStyles } from "../styles/gloabalStyles";
import TextComponent from "./TextComponent";

interface Props {
  icon?: ReactNode;
  text: string;
  type?: "primary" | "text" | "link";
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textFonts?: string;
  textStyles?: StyleProp<TextStyle>;
  onPress?: () => void;
  iconFlex?: "right" | "left";
  disable?: boolean;
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textFonts,
    textStyles,
    onPress,
    iconFlex,
    disable,
  } = props;
  return type === "primary" ? (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        globalStyles.button,
        globalStyles.shadow,
        {
          backgroundColor: color
            ? color
            : disable
            ? appColor.gray
            : appColor.primary,
          marginBottom: 20,
          width: "90%",
          justifyContent: "center",
        },
        styles,
      ]}
    >
      {icon && iconFlex === "left" && icon}
      <TextComponent
        text={text}
        color={textColor ?? appColor.white}
        styles={[
          textStyles,
          {
            margin: icon ? 12 : 0,
            fontSize: 16,
            textAlign: "center",
          },
        ]}
        flex={icon && iconFlex === "right" ? 1 : 0}
        font={textFonts ?? fontFamilies.bold}
      />
      {!disable && icon && iconFlex === "right" && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextComponent
        text={text}
        color={type === "link" ? appColor.link : appColor.text}
      />
    </TouchableOpacity>
  );
};
export default ButtonComponent;
