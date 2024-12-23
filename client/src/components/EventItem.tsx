import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Location } from "iconsax-react-native";
import React from "react";
import { ImageBackground } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { appColor } from "../constants/appColor";
import { appInfo } from "../constants/appInfos";
import { fontFamilies } from "../constants/fontFamilies";
import {
  currentLocationVar,
  followersVar,
  userVar,
} from "../graphqlClient/cache";
import { EventModel } from "../models/EventModel";
import { globalStyles } from "../styles/gloabalStyles";
import { RootStackParamList } from "../types/route";
import { numberToString } from "../utils/numberToString";
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
  const followers = useReactiveVar(followersVar);
  const user = useReactiveVar(userVar);
  const currentLocation = useReactiveVar(currentLocationVar);
  const [editFollower] = useMutation(
    gql`
      mutation EditEventFollower($eventFollowerInput: EventFollowerInput!) {
        editEventFollower(eventFollowerInput: $eventFollowerInput)
      }
    `,
    {
      refetchQueries: [
        {
          query: gql`
            query Events_upcoming {
              events_upcoming {
                EventID
                title
                description
                locationTitle
                locationAddress
                imageUrl
                price
                category
                date
                startAt
                endAt
                position {
                  lat
                  lng
                }
                followers {
                  UserID
                }
                users {
                  UserID
                  PhotoUrl
                }
              }
            }
          `,
        },
        {
          query: gql`
            query ($email: String!) {
              user(email: $email) {
                UserID
                Username
                Password
                Email
                PhotoUrl
                user_followers {
                  EventID
                }
              }
            }
          `,
          variables: {
            email: user.Email,
          },
        },
        {
          query: gql`
            query Events_nearby($paramsInput: ParamsInput!) {
              events_nearby(paramsInput: $paramsInput) {
                EventID
                title
                description
                locationTitle
                locationAddress
                imageUrl
                price
                category
                date
                startAt
                endAt
                position {
                  lat
                  lng
                }
                followers {
                  UserID
                }
                users {
                  UserID
                  PhotoUrl
                }
              }
            }
          `,
          variables: {
            paramsInput: {
              data: {
                lat: currentLocation?.position.lat,
                long: currentLocation?.position.lng,
                distance: 1,
              },
            },
          },
        },
      ],
    }
  );

  const handleFollower = () => {
    const arr: any = [];
    let type: "insert" | "delete" = "delete";

    const index = followers.findIndex(
      (follower) => follower.EventID === item.EventID
    );
    if (index === -1) {
      arr.push({ EventID: item.EventID, __typename: "Event" });
      type = "insert";
    } else {
      arr.splice(index, 1);
    }

    followersVar(arr);
    editFollower({
      variables: {
        eventFollowerInput: {
          type,
          UserID: user.UserID,
          EventID: item.EventID,
        },
      },
    });
  };

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
              text={appInfo.monthNames[
                new Date(item.startAt).getMonth()
              ].substring(0, 3)}
              color={appColor.danger2}
            />
          </CardComponent>
          <CardComponent
            styles={[globalStyles.noSpaceCard]}
            color="#ffffffb3"
            onPress={handleFollower}
          >
            <MaterialIcons
              name="bookmark"
              color={
                item &&
                item.followers.filter(
                  (follower: any) => follower.UserID === user.UserID
                ).length > 0
                  ? appColor.danger2
                  : appColor.white
              }
              size={22}
            />
          </CardComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent text={item.title} title size={18} numberOfLine={1} />
      <AvatarGroup users={item.users} />
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
