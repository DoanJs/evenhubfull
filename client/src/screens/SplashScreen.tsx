import React from "react";
import { ActivityIndicator, Image, ImageBackground } from "react-native";
import splash_img from "../assets/images/splash-img.png";
import logo from "../assets/images/logo.png";
import { appInfo } from "../constants/appInfos";
import { SpaceComponent } from "../components";
import { appColor } from "../constants/appColor";

const SplashScreen = () => {
  return (
    <ImageBackground
      imageStyle={{ flex: 1 }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={splash_img}
    >
      <Image
        source={logo}
        style={{
          width: appInfo.sizes.WIDTH * 0.7,
          resizeMode: "contain",
        }}
      />
      <SpaceComponent height={16} />
      <ActivityIndicator color={appColor.gray} size={22} />
    </ImageBackground>
  );
};

export default SplashScreen;
