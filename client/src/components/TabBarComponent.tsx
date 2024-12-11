import { ArrowRight2 } from "iconsax-react-native";
import React from "react";
import { appColor } from "../constants/appColor";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
interface Props {
  title: string;
  onPress?: () => void;
}
const TabBarComponent = (props: Props) => {
  const { title, onPress } = props;
  return (
    <RowComponent
      styles={{
        marginVertical: 20,
        paddingHorizontal: onPress ? 16 : 0,
      }}
    >
      <TextComponent text={title} title flex={1} size={18} />
      {onPress && (
        <RowComponent onPress={onPress}>
          <TextComponent text="See All " size={12} color={appColor.text2} />
          <ArrowRight2 size={14} color={appColor.text2} variant="Bold" />
        </RowComponent>
      )}
    </RowComponent>
  );
};

export default TabBarComponent;
