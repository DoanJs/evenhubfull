import React, { ReactNode } from "react";
import { FlatList, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { appColor } from "../constants/appColor";
import TagComponent from "./TagComponent";
import { globalStyles } from "../styles/gloabalStyles";

interface Props {
  isFill?: boolean;
}

interface Category {
  icon: ReactNode;
  color: string;
  label: string;
  key: string;
}
const CategoriesList = (props: Props) => {
  const { isFill } = props;
  const categories: Category[] = [
    {
      key: "sport",
      label: "Sports",
      icon: (
        <FontAwesome5
          name="basketball-ball"
          color={isFill ? appColor.white : "#f0635a"}
          size={20}
        />
      ),
      color: "#f0635a",
    },
    {
      key: "music",
      label: "Music",
      icon: (
        <FontAwesome5
          name="music"
          color={isFill ? appColor.white : "#f59762"}
          size={20}
        />
      ),
      color: "#f59762",
    },
    {
      key: "food",
      label: "Food",
      icon: (
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          color={isFill ? appColor.white : "#29d697"}
          size={20}
        />
      ),
      color: "#29d697",
    },
    {
      key: "color",
      label: "Color",
      icon: (
        <Ionicons
          name="color-palette"
          color={isFill ? appColor.white : "#46cdf8"}
          size={20}
        />
      ),
      color: "#46cdf8",
    },
  ];
  return (
    <FlatList
      style={{ paddingHorizontal: 16 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({ item, index }) => (
        <TagComponent
          styles={[
            globalStyles.shadow,
            ,
            {
              marginRight: index === categories.length - 1 ? 28 : 12,
              minWidth: 82,
            },
          ]}
          bgColor={isFill ? item.color : appColor.white}
          label={item.label}
          icon={item.icon}
          onPress={() => {}}
          textColor={isFill ? appColor.white : appColor.text}
        />
      )}
    />
  );
};

export default CategoriesList;
