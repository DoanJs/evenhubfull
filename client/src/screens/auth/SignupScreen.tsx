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
import { LoadingModal } from "../../modals";
import { RootStackParamList } from "../../types/route";

const initValue = {
  username: "DoanCuong",
  email: "doanjs1994@gmail.com",
  password: "cuong",
  confirmPassword: "cuong",
};

const SignupScreen = () => {
  const [values, setValues] = useState(initValue);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword)) ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, values]);

  const formValidator = (key: string) => {
    const data = { ...errorMessage };
    let message: string | null = "";
    switch (key) {
      case "email":
        if (!values.email) {
          message = "Email is require !";
        } else if (!Validate.email(values.email)) {
          message = "Email is not valid !";
        } else {
          message = null;
        }
        break;

      case "password":
        if (!values.password) {
          message = "Password is require !";
        } else if (
          values.confirmPassword &&
          values.confirmPassword !== values.password
        ) {
          data["confirmPassword"] = "Password is not match !!!";
          message = null;
        } else if (!values.confirmPassword) {
          data["confirmPassword"] = "Please type confirm password !";
          message = null;
        } else {
          data["confirmPassword"] = null;
          message = null;
        }
        break;
      case "confirmPassword":
        if (!values.confirmPassword) {
          message = "Please type confirm password !";
        } else if (values.confirmPassword !== values.password) {
          message = "Password is not match !!!";
        } else {
          data["password"] = null;
          message = null;
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
    setIsLoading(true);
    // if (
    //   values.username.trim() === "" ||
    //   values.password.trim() === "" ||
    //   values.email.trim() === ""
    // )
    // thoa cac dk. bat dau goi api
    AxiosAPI("post", "verification", {
      username: values.email,
      password: values.password,
    })
      .then((result: any) => {
        const { code } = result.data;
        navigation.navigate("Verification", {
          code: code,
          ...values,
        });
        setIsLoading(false);
        console.log(code);
      })
      .catch((err: any) => {
        alert(err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <>
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

        {errorMessage &&
          (errorMessage.email ||
            errorMessage.password ||
            errorMessage.confirmPassword) && (
            <SectionComponent>
              {Object.keys(errorMessage).map(
                (error, index) =>
                  errorMessage[`${error}`] !== null && (
                    <TextComponent
                      text={errorMessage[`${error}`]}
                      key={`error${index}}`}
                      color={appColor.danger}
                    />
                  )
              )}
            </SectionComponent>
          )}

        <SpaceComponent height={16} />
        <SectionComponent styles={{ alignItems: "center" }}>
          <ButtonComponent
            disable={isDisable}
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

      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignupScreen;
