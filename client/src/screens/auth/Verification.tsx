import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TextInput } from "react-native";
import arrowRight from "../../assets/images/arrowRight.png";
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { fontFamilies } from "../../constants/fontFamilies";
import { LoadingModal } from "../../modals";
import { RootStackParamList } from "../../types/route";
import AxiosAPI from "../../utils/auth/callapi";
import JWTManager from "../../utils/auth/jwt";

const Verification = () => {
  const { code, username, email, password } = useRoute().params as {
    code: string;
    username: string;
    email: string;
    password: string;
  };
  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState("");
  const [limit, setLimit] = useState(120);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    let item = ``;

    codeValues.forEach((val) => (item += val));

    setNewCode(item);
  }, [codeValues]);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit((limit) => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;

    setCodeValues(data);
  };

  const handleResendVerification = async () => {
    setCodeValues(["", "", "", ""]);
    setNewCode("");
    ref1.current.focus();

    setIsLoading(true);
    try {
      AxiosAPI("post", "verification", {
        username: email,
        password: password,
      })
        .then((result: any) => {
          const { code } = result.data;
          setIsLoading(false);
          setLimit(120);
          setCurrentCode(code);
          console.log(code);
        })
        .catch((err: any) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not send verification code ${error}`);
    }
  };

  const handleAutoLogin = (email: string, password: string) => {
    AxiosAPI("post", "login", { username: email, password })
      .then(async (result: any) => {
        await AsyncStorage.setItem("accessToken", result.data.access_token);
        JWTManager.setToken(result.data.access_token);
        console.log(result.data.access_token);
        setIsLoading(false);
        navigation.navigate("MainScreen");
      })
      .catch((err: any) => {
        console.log(err.mesage);
        setIsLoading(false);
      });
  };

  const handleVerification = async () => {
    if (limit > 0) {
      if (parseInt(newCode) !== parseInt(currentCode)) {
        setErrorMessage("Invalid code!!!");
      } else {
        setErrorMessage("");
        const data = {
          email,
          password,
          username: username ?? "",
        };
        try {
          AxiosAPI("post", "register", data)
            .then(async (result: any) => {
              navigation.navigate("LoginScreen");
              console.log(
                "Tài khoản " + result.data?.Username + " đăng ký thành công"
              );
              await AsyncStorage.setItem("auth", JSON.stringify(result.data));
              // auto login
              setIsLoading(true);
              handleAutoLogin(email, password);
            })
            .catch((err: any) => {
              console.log(err);
            });
        } catch (error) {
          setErrorMessage("User has already exist!!!");
          console.log(`Can not create new user ${error}`);
        }
      }
    } else {
      setErrorMessage("Time out verification code, please resend new code!!!");
    }
  };

  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Verification" title font={fontFamilies.bold} />
        <SpaceComponent height={20} />
        <TextComponent
          text={`We’ve send you the verification code on ${email.replace(
            /.{1,5}/,
            (m: any) => "*".repeat(m.length)
          )}`}
          font={fontFamilies.bold}
        />
        <SpaceComponent height={20} />
        <RowComponent
          styles={{
            justifyContent: "space-around",
          }}
        >
          <TextInput
            keyboardType="number-pad"
            style={[styles.input]}
            maxLength={1}
            placeholder="-"
            ref={ref1}
            value={codeValues[0]}
            onChangeText={(val) => {
              val.length > 0 && ref2.current.focus();
              handleChangeCode(val, 0);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            style={[styles.input]}
            maxLength={2}
            placeholder="-"
            ref={ref2}
            value={codeValues[1]}
            onChangeText={(val) => {
              val.length > 0 && ref3.current.focus();
              handleChangeCode(val, 1);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            style={[styles.input]}
            maxLength={3}
            placeholder="-"
            ref={ref3}
            value={codeValues[2]}
            onChangeText={(val) => {
              val.length > 0 && ref4.current.focus();
              handleChangeCode(val, 2);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            style={[styles.input]}
            maxLength={1}
            placeholder="-"
            ref={ref4}
            value={codeValues[3]}
            onChangeText={(val) => handleChangeCode(val, 3)}
          />
        </RowComponent>
        <SpaceComponent height={16} />
        <SectionComponent styles={{ alignItems: "center" }}>
          <ButtonComponent
            type="primary"
            text="CONTINUE"
            styles={{ marginBottom: 0 }}
            icon={<Image source={arrowRight} height={20} />}
            iconFlex="right"
            onPress={handleVerification}
          />
        </SectionComponent>

        {errorMessage && (
          <SectionComponent>
            <TextComponent
              styles={{ textAlign: "center" }}
              text={errorMessage}
              color={appColor.danger}
            />
          </SectionComponent>
        )}

        <SectionComponent>
          {limit > 0 ? (
            <RowComponent justify="center">
              <TextComponent text="Re-send code in  " flex={0} />
              <TextComponent
                text={`${(limit - (limit % 60)) / 60}:${
                  limit - (limit - (limit % 60))
                }`}
                flex={0}
                color={appColor.link}
              />
            </RowComponent>
          ) : (
            <RowComponent justify="center">
              <ButtonComponent
                textStyles={{ fontStyle: "italic" }}
                type="link"
                text="Resend email verification"
                onPress={handleResendVerification}
              />
            </RowComponent>
          )}
        </SectionComponent>
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default Verification;
const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColor.gray2,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    textAlign: "center",
  },
});
