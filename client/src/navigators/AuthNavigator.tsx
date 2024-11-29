import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  ForgotPassword,
  LoginScreen,
  OnbroadingScreen,
  SignupScreen,
  Verification,
} from "../screens";
import MainNavigator from "./MainNavigator";

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OnbroadingScreen" component={OnbroadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="MainScreen" component={MainNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
