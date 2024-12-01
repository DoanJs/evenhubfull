import { StyleProp, TextStyle, Text, Platform } from "react-native";
import { appColor } from "../constants/appColor";
import { fontFamilies } from "../constants/fontFamilies";
import { globalStyles } from "../styles/gloabalStyles";

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
}

const TextComponent = (props: Props) => {
  const { text, color, size, flex, font, styles, title } = props;
  const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14
  return (
    <Text
      style={[
        globalStyles.text,
        {
          color: color ?? appColor.text,
          flex: flex ?? 0,
          fontSize: size ?? title ? 24 : fontSizeDefault,
          fontFamily: font ?? title ? fontFamilies.bold : fontFamilies.regular,
        },
        styles,
      ]}
    >
      {text}
    </Text>
  );
};
export default TextComponent;
