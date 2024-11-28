import React from "react";
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../../components";
import { appColor } from "../../../constants/appColor";
import { fontFamilies } from "../../../constants/fontFamilies";
import { Image } from "react-native";
import GoogleIcon from "../../../assets/images/google.png";
import FacebookIcon from "../../../assets/images/facebook.png";

const SocialLogin = () => {
  return (
    <SectionComponent styles={{alignItems:"center"}}>
      <TextComponent
        text="OR"
        color={appColor.gray3}
        size={16}
        font={fontFamilies.medium}
        styles={{
          textAlign: "center",
        }}
      />
      <SpaceComponent height={16}/>
      <ButtonComponent
        type="primary"
        color={appColor.white}
        textColor={appColor.text}
        text="Login with Google"
        textFonts={fontFamilies.regular}
        iconFlex="left"
        icon={<Image source={GoogleIcon} height={20}/>}
      />
      <ButtonComponent
        type="primary"
        color={appColor.white}
        textColor={appColor.text}
        text="Login with Facebook"
        textFonts={fontFamilies.regular}
        iconFlex="left"
        icon={<Image source={FacebookIcon} />}
      />
    </SectionComponent>
  );
};

export default SocialLogin;
