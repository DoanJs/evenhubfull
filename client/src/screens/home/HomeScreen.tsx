import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Location from "expo-location";
import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Invite from "../../assets/images/invite.png";
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { appInfo } from "../../constants/appInfos";
import { fontFamilies } from "../../constants/fontFamilies";
import { currentLocationVar } from "../../graphqlClient/cache";
import { EventModel } from "../../models/EventModel";
import { globalStyles } from "../../styles/gloabalStyles";
import { RootStackParamList } from "../../types/route";
import { HandleNotification } from "../../utils/handleNotification";

const HomeScreen = () => {
  const navigation: DrawerNavigationProp<RootStackParamList> = useNavigation();
  const currentLocation = useReactiveVar(currentLocationVar);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [events_nearby, setEvents_nearby] = useState<EventModel[]>([]);
  const { data: data_events_nearby, loading: loading_events_nearby } = useQuery(
    gql`
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
          author {
            UserID
            Email
            Username
          }
        }
      }
    `,
    {
      variables: {
        paramsInput: {
          data: {
            lat: currentLocation?.position.lat,
            long: currentLocation?.position.lng,
            distance: 1,
          },
        },
      },
    }
  );
  const {
    data: data_events_upcoming,
    loading: loading_events_upcoming,
    error,
  } = useQuery(
    gql`
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
          author {
            UserID
            Email
            Username
          }
        }
      }
    `
  );

  useEffect(() => {
    const reverseGeoCode = async ({
      lat,
      long,
    }: {
      lat: number;
      long: number;
    }) => {
      try {
        const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apiKey=ZPutiMhrZbuL1-Asb4NriJsqiVqvVWxpKXtNMqUyULg`;
        const res = await axios(api);
        if (res && res.status === 200 && res.data) {
          const items = res.data.items;
          currentLocationVar(items[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      // setLocation(location);
      reverseGeoCode({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (data_events_upcoming) {
      setEvents(data_events_upcoming.events_upcoming);
    }
  }, [data_events_upcoming]);

  useEffect(() => {
    if (data_events_nearby) {
      setEvents_nearby(data_events_nearby.events_nearby);
    }
  }, [data_events_nearby]);

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          backgroundColor: appColor.primary,
          height: 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop:
            Platform.OS === "android" ? Number(StatusBar.currentHeight) : 52,
          // paddingHorizontal: 16,
        }}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColor.white} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "center" }}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColor.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={20}
                  color={appColor.white}
                />
              </RowComponent>
              {currentLocation && (
                <TextComponent
                  text={`${currentLocation.address.city}, ${currentLocation.address.countryName}`}
                  color={appColor.white}
                  font={fontFamilies.bold}
                  size={13}
                />
              )}
            </View>
            <CircleComponent
              color="#524ce0"
              size={36}
              onPress={async () => {
                await HandleNotification.sendPushNotification('ExponentPushToken[aItaukCHenOmipmx8F7orA]');
                // await HandleNotification.schedulePushNotification();
              }}
            >
              <View>
                <Notification size={18} color={appColor.white} />
                <View
                  style={{
                    backgroundColor: "#02e9fe",
                    width: 8,
                    height: 8,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: "#524ce0",
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                />
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={20} />
          <RowComponent>
            <RowComponent
              styles={{ flex: 1 }}
              onPress={() =>
                navigation.navigate("SearchEvents", {
                  isFilter: false,
                })
              }
            >
              <SearchNormal1
                variant="TwoTone"
                color={appColor.white}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  height: 20,
                  backgroundColor: appColor.gray2,
                  marginHorizontal: 10,
                }}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColor.gray2}
                size={16}
              />
            </RowComponent>
            <TagComponent
              bgColor="#5d56f3"
              label="Fillters"
              icon={
                <CircleComponent size={20} color="#b1aefa">
                  <Sort size={16} color="white" />
                </CircleComponent>
              }
              onPress={() =>
                navigation.navigate("SearchEvents", {
                  isFilter: true,
                })
              }
            />
          </RowComponent>
          <SpaceComponent height={20} />
        </View>

        <View style={{ marginBottom: -16 }}>
          <CategoriesList isFill />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
            marginTop: Platform.OS === "ios" ? 12 : 18,
          },
        ]}
      >
        <SectionComponent styles={{ paddingHorizontal: 0 }}>
          <TabBarComponent onPress={() => {}} title="Upcoming Events" />
          {events.length > 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={events}
              renderItem={({ item }: { item: EventModel }) => (
                <EventItem
                  item={item}
                  key={`event${item.EventID}`}
                  type="card"
                />
              )}
            />
          ) : (
            <LoadingComponent
              isLoading={loading_events_upcoming}
              value={events?.length as number}
            />
          )}
        </SectionComponent>
        <SectionComponent>
          <ImageBackground
            style={{
              flex: 1,
              padding: 16,
              width: appInfo.sizes.WIDTH,
              minHeight: 127,
            }}
            source={Invite}
            imageStyle={{
              resizeMode: "cover",
              borderRadius: 12,
            }}
          >
            <TextComponent text="Invite your friends" size={18} title />
            <TextComponent text="Get $20 for ticket" size={13} />
            <RowComponent>
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    marginTop: 12,
                    backgroundColor: "#00F8FF",
                    paddingHorizontal: 28,
                    minHeight: 32,
                  },
                ]}
              >
                <TextComponent
                  text="INVITE"
                  font={fontFamilies.bold}
                  color={appColor.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>
        <SectionComponent styles={{ paddingHorizontal: 0 }}>
          <TabBarComponent onPress={() => {}} title="Nearby You" />
          {events_nearby.length > 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={events_nearby}
              renderItem={({ item }: { item: EventModel }) => (
                <EventItem
                  item={item}
                  key={`event${item.EventID}`}
                  type="card"
                />
              )}
            />
          ) : (
            <LoadingComponent
              isLoading={loading_events_nearby}
              value={events?.length as number}
            />
          )}
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
