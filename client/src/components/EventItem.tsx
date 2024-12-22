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
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../graphqlClient/cache";
import { numberToString } from "../utils/numberToString";

interface Props {
  item: EventModel;
  type: "card" | "list";
}
const EventItem = (props: Props) => {
  const { item, type } = props;
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const user = useReactiveVar(userVar);

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
        source={{ uri: item.imageUrl }}
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
              text={numberToString(new Date(item.startAt).getDate()) as string}
              color={appColor.danger2}
            />
            <TextComponent
              font={fontFamilies.bold}
              size={12}
              text={appInfo.monthNames[new Date(item.startAt).getMonth()].substring(0,3)}
              color={appColor.danger2}
            />
          </CardComponent>
          {item.followers &&
            item.followers.filter(
              (follower: any) => follower.UserID === user.UserID
            ).length > 0 && (
              <CardComponent
                styles={[globalStyles.noSpaceCard]}
                color="#ffffffb3"
              >
                <MaterialIcons
                  name="bookmark"
                  color={appColor.danger2}
                  size={22}
                />
              </CardComponent>
            )}
        </RowComponent>
      </ImageBackground>
      <TextComponent text={item.title} title size={18} numberOfLine={1} />
      <AvatarGroup users={item.users}/>
      <RowComponent>
        <Location size={18} variant="Bold" color={appColor.text2} />
        <SpaceComponent width={6} />
        <TextComponent
          flex={1}
          numberOfLine={1}
          text={item.locationAddress}
          size={14}
          color={appColor.text3}
        />
      </RowComponent>
    </CardComponent>
  );
};

export default EventItem;
