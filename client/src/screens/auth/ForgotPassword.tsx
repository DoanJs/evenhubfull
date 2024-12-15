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
import { Validate } from "../../utils/validate";
import { LoadingModal } from "../../modals";
import AxiosAPI from "../../utils/auth/callapi";
import { RootStackParamList } from "../../types/route";

const ForgotPassword = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [email, setEmail] = useState("doanjs1994@gmail.com");
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckEmail = () => {
    const isValidEmail = Validate.email(email);
    setIsDisable(!isValidEmail);
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      AxiosAPI("post", "forgotPassword", { email })
        .then(async (result: any) => {
          console.log(result.data);
          alert(
            `Mật khẩu mới đã được gửi vào gmail ${email.replace(
              /.{1,5}/,
              (m: any) => "*".repeat(m.length)
            )}`
          );
          navigation.navigate("LoginScreen");
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.log(err.response.data.message);
          alert(err.response.data.message)
          setIsLoading(false);
        });
    } catch (error) {
      console.log(`Can not create new password api forgot password, ${error}`);
    }
  };

  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionComponent>
        <TextComponent text="Resset Password" title />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponent height={24} />
        <InputComponent
          placeholder="abc@email.com"
          value={email}
          onChange={(val) => setEmail(val)}
          affix={<Sms size={24} color={appColor.gray} />}
          onEnd={handleCheckEmail}
        />
      </SectionComponent>
      <SectionComponent styles={{ alignItems: "center" }}>
        <ButtonComponent
          text="SEND"
          type="primary"
          textFonts={fontFamilies.medium}
          iconFlex="right"
          icon={<Image source={arrownRight} height={20} />}
          onPress={handleForgotPassword}
          disable={isDisable}
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default ForgotPassword;
