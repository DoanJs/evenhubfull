import { ApolloProvider, useReactiveVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import * as SplashSScreen from "expo-splash-screen";
import { jwtDecode, JwtPayload } from "jwt-decode";
import React, { useEffect, useState } from "react";
import client from "./src/graphqlClient";
import { tokenVar } from "./src/graphqlClient/cache";
import AuthNavigator from "./src/navigators/AuthNavigator";
import MainNavigator from "./src/navigators/MainNavigator";
import { SplashScreen } from "./src/screens";
import AxiosAPI from "./src/utils/auth/callapi";
import JWTManager from "./src/utils/auth/jwt";

SplashSScreen.preventAutoHideAsync();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const token = useReactiveVar(tokenVar);

  const [loaded, error] = useFonts({
    AirbnbCereal_W_Bd: require("./assets/fonts/AirbnbCereal_W_Bd.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashSScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    checkLogin();
    fcmtoken()
  }, []);

  const fcmtoken = async () => {
    const tokenFCM = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(tokenFCM)
  };

  const checkLogin = async () => {
    const tokenStorage = await AsyncStorage.getItem("accessToken");
    if (tokenStorage) {
      const decode = jwtDecode<JwtPayload & UserType>(tokenStorage);

      if (decode?.exp && decode.exp < Date.now() / 1000) {
        const refresh_token = await AsyncStorage.getItem("refreshToken");
        AxiosAPI("POST", "refresh_token", { refresh_token })
          .then(async (res) => {
            JWTManager.setToken(res.data.access_token);
            await AsyncStorage.setItem("accessToken", res.data.access_token); //Phục vụ reload app or mới vào app để check
            tokenVar(res.data.access_token);
            console.log("App-token(59): ", res.data.access_token);
          })
          .catch((err) => console.log("App-err(61): ", err));
      } else {
        tokenVar(tokenStorage);
        JWTManager.setToken(tokenStorage);
      }
    }
  };

  if (!loaded && !error) {
    return null;
  }

  return isShowSplash ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      {token ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const MyApplication = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
export default MyApplication;
