import { ApolloProvider, useReactiveVar } from "@apollo/client";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashSScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import client from "./src/graphqlClient";
import { tokenVar } from "./src/graphqlClient/cache";
import AuthNavigator from "./src/navigators/AuthNavigator";
import MainNavigator from "./src/navigators/MainNavigator";
import { SplashScreen } from "./src/screens";
import JWTManager from "./src/utils/auth/jwt";

SplashSScreen.preventAutoHideAsync();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const token = useReactiveVar(tokenVar);
  const { getItem, setItem } = useAsyncStorage("accessToken");

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
  }, []);

  const checkLogin = async () => {
    const tokenStorage = await AsyncStorage.getItem("accessToken");
    if (tokenStorage) {
      tokenVar(tokenStorage);
      JWTManager.setToken(tokenStorage);
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
