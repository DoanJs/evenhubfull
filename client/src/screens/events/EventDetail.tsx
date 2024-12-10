import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import {
  CardComponent,
  ContainerComponent,
  RowComponent,
  TextComponent,
} from "../../components";
import EventImage from "../../assets/images/event-image.png";
import { appInfo } from "../../constants/appInfos";
import { ArrowLeft2 } from "iconsax-react-native";
import { appColor } from "../../constants/appColor";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { globalStyles } from "../../styles/gloabalStyles";
import LinearGradient from "react-native-linear-gradient";

const EventDetail = () => {
  return (
    <ContainerComponent isScroll>
      <ImageBackground
        source={EventImage}
        style={{ height: 244 }}
        imageStyle={{
          padding: 16,
          resizeMode: "cover",
          height: 244,
          width: appInfo.sizes.WIDTH,
        }}
      >
        <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}>
          <RowComponent>
            <RowComponent styles={{ flex: 1 }}>
              <TouchableOpacity>
                <ArrowLeft2 size={24} color={appColor.white} />
              </TouchableOpacity>
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
      </ImageBackground>
    </ContainerComponent>
  );
};

export default EventDetail;
