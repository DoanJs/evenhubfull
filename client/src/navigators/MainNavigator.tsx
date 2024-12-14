import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import DrawerNavigator from "./DrawerNavigator";
import { Host } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EventDetail } from "../screens";

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Host>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={DrawerNavigator} />
          <Stack.Screen name="EventDetail" component={EventDetail} />
        </Stack.Navigator>
      </Host>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;
