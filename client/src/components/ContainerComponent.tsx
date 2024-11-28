import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/gloabalStyles";
import Splash from "../assets/images/splash-img.png";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "iconsax-react-native";
import { appColor } from "../constants/appColor";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
import { fontFamilies } from "../constants/fontFamilies";

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
}

const ContainerComponent = (props: Props) => {
  const { isImageBackground, isScroll, title, children, back } = props;
  const navigation = useNavigation();

  const headerComponent = () => {
    return (
      <View>
        {(back || title) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minHeight: 48,
              minWidth: 48,
            }}
          >
            {back && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color={appColor.text} />
              </TouchableOpacity>
            )}
            {title && (
              <TextComponent text={title} styles={{ marginLeft: 12 }} font={fontFamilies.medium} />
            )}
          </RowComponent>
        )}
        {returnContainer}
      </View>
    );
  };

  const returnContainer = isScroll ? (
    <ScrollView>{children}</ScrollView>
  ) : (
    <View>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={Splash}
      style={{ flex: 1 }}
      imageStyle={{ flex: 1 }}
    >
      <SafeAreaView>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>{headerComponent()}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
