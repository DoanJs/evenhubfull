import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Location } from "iconsax-react-native";
import React from "react";
import { ImageBackground } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Avatar from "../assets/images/avatar.png";
import { appColor } from "../constants/appColor";
import { appInfo } from "../constants/appInfos";
import { fontFamilies } from "../constants/fontFamilies";
import { EventModel } from "../models/EventModel";
import { globalStyles } from "../styles/gloabalStyles";
import { RootStackParamList } from "../types/route";
import AvatarGroup from "./AvatarGroup";
import CardComponent from "./CardComponent";
import RowComponent from "./RowComponent";
import SpaceComponent from "./SpaceComponent";
import TextComponent from "./TextComponent";

interface Props {
  item: EventModel;
  type: "card" | "list";
}
const EventItem = (props: Props) => {
  const { item, type } = props;
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <CardComponent
      isShadow
      onPress={() => navigation.navigate("EventDetail", { item })}
      styles={{ width: appInfo.sizes.WIDTH * 0.7 }}
    >
      <ImageBackground
        style={{
          flex: 1,
          marginBottom: 12,
          padding: 10,
          height: 131,
        }}
        source={Avatar}
        imageStyle={{
          resizeMode: "cover",
          borderRadius: 12,
        }}
      >
        <RowComponent styles={{ justifyContent: "space-between" }}>
          <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffb3">
            <TextComponent
              font={fontFamilies.bold}
              size={18}
              text="10"
              color={appColor.danger2}
            />
            <TextComponent
              font={fontFamilies.bold}
              size={12}
              text="June"
              color={appColor.danger2}
            />
          </CardComponent>
          <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffb3">
            <MaterialIcons name="bookmark" color={appColor.danger2} size={22} />
          </CardComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent text={item.title} title size={18} numberOfLine={1} />
      <AvatarGroup />
      <RowComponent>
        <Location size={18} variant="Bold" color={appColor.text2} />
        <SpaceComponent width={6} />
        <TextComponent
          flex={1}
          numberOfLine={1}
          text={item.location.address}
          size={16}
          color={appColor.text3}
        />
      </RowComponent>
    </CardComponent>
  );
};

export default EventItem;
