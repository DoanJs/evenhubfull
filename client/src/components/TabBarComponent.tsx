import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import TextComponent from "./TextComponent";
import RowComponent from "./RowComponent";
import { appColor } from "../constants/appColor";
interface Props {
  title: string;
  onPress: () => void;
}
const TabBarComponent = (props: Props) => {
  const { title, onPress } = props;
  return (
    <RowComponent styles={{
        marginTop: 20 
    }}>
      <TextComponent text={title} title flex={1} size={18} />
      <TouchableOpacity>
        <TextComponent text="See All" size={12} color={appColor.gray} />
      </TouchableOpacity>
    </RowComponent>
  );
};

export default TabBarComponent;
