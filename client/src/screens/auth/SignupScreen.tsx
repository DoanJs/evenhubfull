import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Lock, Sms, User } from "iconsax-react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import arrownRight from "../../assets/images/arrowRight.png";
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { SocialLogin } from "./components";

const initValue = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupScreen = () => {
  const [values, setValues] = useState(initValue);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };
    data[`${key}`] = value;
    setValues(data);
  };
  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent text="Sign up" size={24} title />
        <SpaceComponent height={21} />
        <InputComponent
          type="email-address"
          placeholder="Full name"
          value={values.username}
          onChange={(val) => handleChangeValue("username", val)}
          allowClear
          affix={<User size={22} color={appColor.gray} />}
        />
        <InputComponent
          type="email-address"
          placeholder="abc@email.com"
          value={values.email}
          onChange={(val) => handleChangeValue("email", val)}
          allowClear
          affix={<Sms size={22} color={appColor.gray} />}
        />
        <InputComponent
          isPassword
          placeholder="Password"
          value={values.password}
          onChange={(val) => handleChangeValue("password", val)}
          allowClear
          affix={<Lock size={22} color={appColor.gray} />}
        />
        <InputComponent
          isPassword
          placeholder="Confirm password"
          value={values.confirmPassword}
          onChange={(val) => handleChangeValue("confirmPassword", val)}
          allowClear
          affix={<Lock size={22} color={appColor.gray} />}
        />
      </SectionComponent>

      <SpaceComponent height={16} />
      <SectionComponent styles={{ alignItems: "center" }}>
        <ButtonComponent type="primary" text="SIGN UP" 
          iconFlex="right"
          icon={<Image source={arrownRight} height={20} />}/>
      </SectionComponent>

      <SocialLogin />

      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Already have an account? " />
          <ButtonComponent
            text="Signin"
            type="link"
            onPress={() => navigation.navigate("LoginScreen")}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SignupScreen;
