import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Lock, Sms } from "iconsax-react-native";
import React, { useState } from "react";
import { Image, Switch } from "react-native";
import arrownRight from "../../assets/images/arrowRight.png";
import TextLogo from "../../assets/images/text-logo.png";
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
import AxiosAPI from "../../utils/auth/callapi";
import { SocialLogin } from "./components";
import JWTManager from '../../utils/auth/jwt'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(true);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  // const number = useReactiveVar(numberVar);

  const handleLogin = () => {
    AxiosAPI("post", "login", { username: email, password })
      .then((result: any) => {
        JWTManager.setToken(result.data.access_token);
        console.log(result.data.access_token)
        // navigation.navigate('HomeScreen')
      })
      .catch((err: any) => {
        console.log(err.mesage);
      });
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 75,
        }}
      >
        <Image
          source={TextLogo}
          style={{
            width: 162,
            height: 114,
            marginBottom: 30,
          }}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Sign in" size={24} title />
        <SpaceComponent height={21} />
        <InputComponent
          type="email-address"
          placeholder="Email"
          value={email}
          onChange={(val) => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColor.gray} />}
        />
        <InputComponent
          isPassword
          placeholder="Password"
          value={password}
          onChange={(val) => setPassword(val)}
          allowClear
          affix={<Lock size={22} color={appColor.gray} />}
        />
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{
                true: appColor.primary,
              }}
              thumbColor={appColor.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent text="Remember me!" color={appColor.text} />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            type="link"
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent styles={{ alignItems: "center" }}>
        <ButtonComponent
          type="primary"
          text="SIGN IN"
          iconFlex="right"
          icon={<Image source={arrownRight} height={20} />}
          onPress={handleLogin}
        />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don't have an account? " />
          <ButtonComponent
            text="Sign up"
            type="link"
            onPress={() => navigation.navigate("SignupScreen")}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
