import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ForgotPassword,
  LoginScreen,
  OnbroadingScreen,
  SignupScreen,
  Verification,
} from "../screens";
import MainNavigator from "./MainNavigator";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../graphqlClient/cache";

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  const user = useReactiveVar(userVar);
  const [userCurrent, setUserCurrent] = useState(null);

  // const [isExistingUser, setIsExistingUser] = useState(false);

  // useEffect(() => {
  //   checkUserExisting()
  // }, [])

  // const checkUserExisting = async () => {
  //   const res = await AsyncStorage.getItem("auth");
  //   res && setIsExistingUser(true);
  // };
  useEffect(() => {
    setUserCurrent(user);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!userCurrent && (
        <Stack.Screen name="OnbroadingScreen" component={OnbroadingScreen} />
      )}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="MainScreen" component={MainNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
