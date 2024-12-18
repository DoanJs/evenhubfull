import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Calendar, Location } from "iconsax-react-native";
import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AuthorEvent from "../../assets/images/author.png";
import EventImage from "../../assets/images/event-image.png";
import {
  AvatarGroup,
  ButtonComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { appInfo } from "../../constants/appInfos";
import { fontFamilies } from "../../constants/fontFamilies";
import { EventModel } from "../../models/EventModel";
import { globalStyles } from "../../styles/gloabalStyles";
import { RootStackParamList } from "../../types/route";
import arrowRight from "../../assets/images/arrowRight.png";

const EventDetail = ({ route }: any) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const { item }: { item: EventModel } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={EventImage}
        style={{
          flex: 1,
          height: 244,
          zIndex: -1,
          backgroundColor: appColor.white,
        }}
        imageStyle={{
          resizeMode: "cover",
          height: 244,
          width: appInfo.sizes.WIDTH,
        }}
      >
        <LinearGradient colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0)"]}>
          <RowComponent
            styles={{
              paddingHorizontal: 10,
              paddingTop: 28,
            }}
          >
            <RowComponent styles={{ flex: 1 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color={appColor.white} />
              </TouchableOpacity>
              <SpaceComponent width={10} />
              <TextComponent
                flex={1}
                text="Event Details"
                title
                color={appColor.white}
              />
            </RowComponent>
            <CardComponent
              styles={[
                globalStyles.noSpaceCard,
                {
                  marginVertical: 10,
                  marginHorizontal: 10,
                  width: 36,
                  height: 36,
                },
              ]}
              color="#ffffff4d"
            >
              <MaterialIcons name="bookmark" color={appColor.white} size={22} />
            </CardComponent>
          </RowComponent>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingTop: 244 - 120,
            zIndex: 1,
          }}
        >
          <SectionComponent>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RowComponent
                justify="space-between"
                styles={[
                  globalStyles.shadow,
                  {
                    backgroundColor: appColor.white,
                    borderRadius: 100,
                    paddingHorizontal: 12,
                    width: "90%",

                    alignItems: "center",
                  },
                ]}
              >
                <AvatarGroup size={36} zIndex={5} />
                <TouchableOpacity
                  style={[
                    globalStyles.button,
                    {
                      backgroundColor: appColor.primary,
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      minHeight: 0,
                    },
                  ]}
                >
                  <TextComponent text="Invite" color={appColor.white} />
                </TouchableOpacity>
              </RowComponent>
            </View>
          </SectionComponent>
          <View
            style={{
              backgroundColor: "#ffffff",
            }}
          >
            <SectionComponent>
              <TextComponent
                title
                text={item.title}
                size={34}
                font={fontFamilies.medium}
              />
            </SectionComponent>
            <SectionComponent>
              <RowComponent>
                <CardComponent
                  styles={[
                    globalStyles.noSpaceCard,
                    {
                      marginVertical: 10,
                      marginHorizontal: 10,
                      width: 48,
                      height: 48,
                    },
                  ]}
                  color={appColor.gray6}
                >
                  <Calendar color={appColor.primary} variant="Bold" size={24} />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 48,
                    justifyContent: "space-around",
                  }}
                >
                  <TextComponent size={16} text="14 December, 2021" title />
                  <TextComponent size={14} text="Tuesday, 4:00PM - 9:00PM" />
                </View>
              </RowComponent>
              <RowComponent>
                <CardComponent
                  styles={[
                    globalStyles.noSpaceCard,
                    {
                      marginVertical: 10,
                      marginHorizontal: 10,
                      width: 48,
                      height: 48,
                    },
                  ]}
                  color={appColor.gray6}
                >
                  <Location color={appColor.primary} variant="Bold" size={24} />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 48,
                    justifyContent: "space-around",
                  }}
                >
                  <TextComponent
                    size={16}
                    text="Gala Convention Center"
                    title
                  />
                  <TextComponent size={14} text="36 Guild Street London, UK " />
                </View>
              </RowComponent>
              <RowComponent styles={{ flex: 1, marginHorizontal: 10 }}>
                <Image
                  source={AuthorEvent}
                  style={{
                    resizeMode: "cover",
                    borderRadius: 12,
                    height: 48,
                    width: 48,
                  }}
                />
                <SpaceComponent width={24} />
                <View
                  style={{
                    flex: 1,
                    height: 48,
                    justifyContent: "space-around",
                  }}
                >
                  <TextComponent size={16} text="Ashfak Sayem" title />
                  <TextComponent size={14} text="Organizer" />
                </View>
                <CardComponent
                  styles={[
                    globalStyles.noSpaceCard,
                    {
                      marginVertical: 10,
                      marginHorizontal: 10,
                      width: 60,
                      height: 28,
                    },
                  ]}
                  color={appColor.gray6}
                >
                  <TextComponent
                    text="Follow"
                    color={appColor.primary}
                    size={12}
                  />
                </CardComponent>
              </RowComponent>
            </SectionComponent>
            <SectionComponent>
              <TabBarComponent title="About Event" />
              <TextComponent text={item.description} />
            </SectionComponent>
          </View>
        </ScrollView>
      </ImageBackground>

      <LinearGradient
        colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 1)"]}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          padding: 12,
          alignItems: "center",
        }}
      >
        <ButtonComponent
          type="primary"
          text="BUY TICKET $120"
          onPress={() => alert('Buy ticket')}
          icon={<Image source={arrowRight} height={20} />}
          iconFlex="right"
        />
      </LinearGradient>
    </View>
  );
};

export default EventDetail;
