import React, { useEffect, useState } from "react";
import AuthNavigator from "./src/navigators/AuthNavigator";
import { SplashScreen } from "./src/screens";
import { NavigationContainer } from "@react-navigation/native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import MainNavigator from "./src/navigators/MainNavigator";
import { useFonts } from 'expo-font';
import * as SplashSScreen from 'expo-splash-screen';
import { ApolloProvider } from "@apollo/client";
import client from "./src/graphqlClient";

SplashSScreen.preventAutoHideAsync();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const { getItem, setItem } = useAsyncStorage("accessToken");

  const [loaded, error] = useFonts({
    'AirbnbCereal_W_Bd': require('./assets/fonts/AirbnbCereal_W_Bd.otf'),
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
    const token = await getItem();
    token && setAccessToken(token);
  };

  
  if (!loaded && !error) {
    return null;
  }

  return isShowSplash ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      {accessToken ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const MyApplication = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
export default MyApplication;