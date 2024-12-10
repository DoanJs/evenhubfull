import React from "react";
import { appInfo } from "../constants/appInfos";
import { EventModel } from "../models/EventModel";
import CardComponent from "./CardComponent";
import TextComponent from "./TextComponent";
import AvatarGroup from "./AvatarGroup";
import RowComponent from "./RowComponent";
import { Bookmark2, Location } from "iconsax-react-native";
import { appColor } from "../constants/appColor";
import SpaceComponent from "./SpaceComponent";
import { ImageBackground } from "react-native";
import Avatar from "../assets/images/avatar.png";
import { fontFamilies } from "../constants/fontFamilies";
import { globalStyles } from "../styles/gloabalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface Props {
  item: EventModel;
  type: "card" | "list";
}
const EventItem = (props: Props) => {
  const { item, type } = props;
  return (
    <CardComponent
      isShadow
      onPress={() => {}}
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
          <CardComponent
            styles={[globalStyles.noSpaceCard]}
            color="#ffffffb3"
          >
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
          <CardComponent
            styles={[globalStyles.noSpaceCard]}
            color="#ffffffb3"
          >
            <MaterialIcons name="bookmark" color={appColor.danger2} size={22}/>
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
