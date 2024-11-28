import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import onbroading_1 from "../../assets/images/onboarding-1.png";
import onbroading_2 from "../../assets/images/onboarding-2.png";
import onbroading_3 from "../../assets/images/onboarding-3.png";
import { appColor } from "../../constants/appColor";
import { appInfo } from "../../constants/appInfos";
import { globalStyles } from "../../styles/gloabalStyles";
import { TextComponent } from "../../components";
import { fontFamilies } from "../../constants/fontFamilies";

const OnbroadingScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [index, setIndex] = useState(0);

  return (
    <View style={[globalStyles.container]}>
      <Swiper
        loop={false}
        onIndexChanged={(num) => setIndex(num)}
        activeDotColor={appColor.white}
        dotColor={appColor.dot}
        index={index}
      >
        <Image style={styles.image} source={onbroading_1} />
        <Image style={styles.image} source={onbroading_2} />
        <Image style={styles.image} source={onbroading_3} />
      </Swiper>
      <View style={styles.skipNext}>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <TextComponent
            text="Skip"
            color={appColor.skip}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigation.navigate("LoginScreen")
          }
        >
          <TextComponent
            text="Next"
            color={appColor.white}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnbroadingScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT,
    resizeMode: "cover",
  },
  skipNext: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  text: {},
});
