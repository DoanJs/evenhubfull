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
import { Validate } from "../../utils/validate";

interface ErrorMessages {
  email: string;
  password: string;
  confirmPassword: string;
}

const initValue = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupScreen = () => {
  const [values, setValues] = useState(initValue);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [errorMessage, setErrorMessage] = useState<any>();

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

  const formValidator = (key: string) => {
    const data = { ...errorMessage };
    let message = "";
    switch (key) {
      case "email":
        if (!values.email) {
          message = "Email is require !";
        } else if (!Validate.email(values.email)) {
          message = "Email is not valid !";
        } else {
          message = "";
        }
        break;

      case "password":
        !values.password ? "Password is require !" : "";
        break;
      case "confirmPassword":
        if (!values.confirmPassword) {
          message = "Please type confirm password!";
        } else if (values.confirmPassword !== values.password) {
          message = "Password is not match!!!";
        } else {
          message = "";
        }
        break;
      default:
        break;
    }

    data[`${key}`] = message;
    setErrorMessage(data);
  };

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };
    data[`${key}`] = value;
    setValues(data);
  };

  const handleSignup = () => {
    // if (
    //   values.username.trim() === "" ||
    //   values.password.trim() === "" ||
    //   values.email.trim() === ""
    // ) {
    //   alert("Không được để trống !");
    //   return;
    // }
    // if (values.password !== values.confirmPassword) {
    //   alert("Xác thực mật khẩu không chính xác !");
    //   return;
    // }
    // // thoa cac dk. bat dau goi api
    // AxiosAPI("post", "register", {
    //   username: values.username,
    //   password: values.password,
    //   email: values.email,
    // })
    //   .then((result: any) => {
    //     navigation.navigate("LoginScreen");
    //     console.log(
    //       "Tài khoản " + result.data?.Username + " đăng ký thành công"
    //     );
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   });
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
          onEnd={() => formValidator("email")}
        />
        <InputComponent
          isPassword
          placeholder="Password"
          value={values.password}
          onChange={(val) => handleChangeValue("password", val)}
          allowClear
          affix={<Lock size={22} color={appColor.gray} />}
          onEnd={() => formValidator("password")}
        />
        <InputComponent
          isPassword
          placeholder="Confirm password"
          value={values.confirmPassword}
          onChange={(val) => handleChangeValue("confirmPassword", val)}
          allowClear
          affix={<Lock size={22} color={appColor.gray} />}
          onEnd={() => formValidator("confirmPassword")}
        />
      </SectionComponent>

      {(errorMessage.email ||
        errorMessage.passwprd ||
        errorMessage.confirmPassword) && (
        <SectionComponent>
          {Object.keys(errorMessage).map((error, index) => (
            <TextComponent
              text={errorMessage[`${error}`]}
              key={`error${index}}`}
              color={appColor.danger}
            />
          ))}
        </SectionComponent>
      )}

      <SpaceComponent height={16} />
      <SectionComponent styles={{ alignItems: "center" }}>
        <ButtonComponent
        disable
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
