import { useReactiveVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from "iconsax-react-native";
import React from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { fontFamilies } from "../../constants/fontFamilies";
import { userVar } from "../../graphqlClient/cache";
import { globalStyles } from "../../styles/gloabalStyles";

const HomeScreen = () => {
  const navigation: DrawerNavigationProp<RootStackParamList> = useNavigation();

  const auth = useReactiveVar(userVar);

  const itemEvent = {
    title: "International Band Music Concert",
    description:
      "About Event Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase",
    location: {
      title: 'Gala Convention Center',
      address:'36 Guild Street London, UK'
    },
    imageUrl: '',
    users: [""],
    authorId: "",
    startAt: Date.now(),
    endAt: Date.now(),
  };

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          backgroundColor: appColor.primary,
          height: 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 52,
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
              <TextComponent
                text="New Yourk, USA"
                color={appColor.white}
                font={fontFamilies.bold}
                size={13}
              />
            </View>
            <CircleComponent color="#524ce0" size={36}>
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
            marginTop: 16,
          },
        ]}
      >
        <SectionComponent styles={{ paddingHorizontal: 0 }}>
          <TabBarComponent onPress={() => {}} title="Upcoming Events" />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Array.from({ length: 5 })}
            renderItem={({ item, index }) => (
              <EventItem item={itemEvent} key={`event${index}`} type="card" />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
