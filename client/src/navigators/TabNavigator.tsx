import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { ReactNode } from "react";
import ExploreNavigator from "./ExploreNavigator";
import EventNavigator from "./EventNavigator";
import { AddNewScreen } from "../screens";
import MapNavigator from "./MapNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { appColor } from "../constants/appColor";
import { Home2 } from "iconsax-react-native";
import { TextComponent } from "../components";
import { Platform } from "react-native";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "coral",
          height: Platform.OS === 'ios' ? 88 : 68,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: ReactNode;
          color = focused ? appColor.primary : appColor.gray;

          switch (route.name) {
            case "Explore":
              icon = <Home2 size={size} color={color} />;
              break;

            default:
              break;
          }

          return icon;
        },
        tabBarIconStyle: {
          marginTop: 0
        },
        tabBarLabel({ focused }) {
          return (
            <TextComponent
              text={route.name}
              flex={0}
              size={12}
              color={focused ? appColor.primary : appColor.gray}
              styles={{
                marginBottom: Platform.OS === "ios" ? 0 : 14,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Events" component={EventNavigator} />
      <Tab.Screen
        name="Add"
        component={AddNewScreen}
        options={
          {
            // tabBarShowLabel: false
          }
        }
      />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
