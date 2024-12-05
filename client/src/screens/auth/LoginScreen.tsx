import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Lock, Sms } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
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
import JWTManager from "../../utils/auth/jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userVar } from "../../graphqlClient/cache";
import { Validate } from "../../utils/validate";

const LoginScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [email, setEmail] = useState("hung@gmail.com");
  const [password, setPassword] = useState("hung");
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const emailValidate = Validate.email(email);
    if (!email || !password || (email && !emailValidate)) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = () => {
    AxiosAPI("post", "login", { username: email, password })
      .then(async (result: any) => {
        await AsyncStorage.setItem("accessToken", result.data.access_token);
        JWTManager.setToken(result.data.access_token);
        console.log(result.data.access_token);

        userVar(result.data.user);

        await AsyncStorage.setItem(
          "auth",
          isRemember ? JSON.stringify(result.data.user) : email
        );
        navigation.navigate("MainScreen");
      })
      .catch((err: any) => {
        console.log(err);
        alert(err.response.data.message);
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
            <SpaceComponent width={4} />
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
          disable={isDisable}
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
