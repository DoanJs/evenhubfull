import { Sms } from "iconsax-react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import arrownRight from "../../assets/images/arrowRight.png";
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { fontFamilies } from "../../constants/fontFamilies";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Resset Password" title />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponent height={24} />
        <InputComponent
          placeholder="abc@email.com"
          value={email}
          onChange={(val) => setEmail(val)}
          affix={<Sms size={24} color={appColor.gray} />}
        />
      </SectionComponent>
      <SectionComponent styles={{ alignItems: "center" }}>
        <ButtonComponent
          text="SEND"
          type="primary"
          textFonts={fontFamilies.medium}
          iconFlex="right"
          icon={<Image source={arrownRight} height={20} />}
          onPress={() => navigation.navigate("Verification")}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ForgotPassword;
