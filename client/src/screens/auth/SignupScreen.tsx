import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Lock, Sms, User } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
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
import AxiosAPI from "../../utils/auth/callapi";
import { SocialLogin } from "./components";
import { gql, useQuery } from "@apollo/client";

const initValue = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupScreen = () => {
  const [values, setValues] = useState(initValue);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const { data: Data_events, error } = useQuery(
    gql`
      query {
        events {
          EventID
          Name
        }
      }
    `
  );

  useEffect(() => {
    console.log(Data_events);
  }, [Data_events]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };
    data[`${key}`] = value;
    setValues(data);
  };

  const handleSignup = () => {
    if (
      values.username.trim() === "" ||
      values.password.trim() === "" ||
      values.email.trim() === ""
    ) {
      alert("Không được để trống !");
      return;
    }
    if (values.password !== values.confirmPassword) {
      alert("Xác thực mật khẩu không chính xác !");
      return;
    }
    // thoa cac dk. bat dau goi api
    AxiosAPI("post", "register", {
      username: values.username,
      password: values.password,
      email: values.email,
    })
      .then((result: any) => {
        navigation.navigate("LoginScreen");
        console.log(
          "Tài khoản " + result.data?.Username + " đăng ký thành công"
        );
      })
      .catch((err: any) => {
        console.log(err);
      });
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
        <ButtonComponent
          type="primary"
          text="SIGN UP"
          iconFlex="right"
          icon={<Image source={arrownRight} height={20} />}
          onPress={handleSignup}
        />
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
