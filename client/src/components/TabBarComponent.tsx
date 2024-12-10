import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import TextComponent from "./TextComponent";
import RowComponent from "./RowComponent";
import { appColor } from "../constants/appColor";
import { ArrowDown2, ArrowRight2 } from "iconsax-react-native";
interface Props {
  title: string;
  onPress: () => void;
}
const TabBarComponent = (props: Props) => {
  const { title, onPress } = props;
  return (
    <RowComponent styles={{
        marginVertical: 20 ,
        paddingHorizontal: 16,
    }}>
      <TextComponent text={title} title flex={1} size={18} />
      <RowComponent onPress={onPress}>
        <TextComponent text="See All " size={12} color={appColor.text2} />
        <ArrowRight2 size={14} color={appColor.text2} variant="Bold"/>
      </RowComponent>
    </RowComponent>
  );
};

export default TabBarComponent;
