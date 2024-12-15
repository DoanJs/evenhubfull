import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AddSquare, Calendar, Location, User } from "iconsax-react-native";
import React, { ReactNode } from "react";
import { Platform } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CircleComponent, TextComponent } from "../components";
import { appColor } from "../constants/appColor";
import { AddNewScreen } from "../screens";
import { RootStackParamList } from "../types/route";
import EventNavigator from "./EventNavigator";
import ExploreNavigator from "./ExploreNavigator";
import MapNavigator from "./MapNavigator";
import ProfileNavigator from "./ProfileNavigator";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 88 : 68,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: ReactNode;
          color = focused ? appColor.primary : appColor.gray5;

          switch (route.name) {
            case "Explore":
              icon = <MaterialIcons name="explore" size={size} color={color} />;
              break;
            case "Events":
              icon = <Calendar variant="Bold" size={size} color={color} />;
              break;
            case "Map":
              icon = <Location variant="Bold" size={size} color={color} />;
              break;
            case "Profile":
              icon = <User variant="Bold" size={size} color={color} />;
              break;
            case "Add":
              icon = (
                <CircleComponent
                  disable={true}
                  size={52}
                  styles={{ marginTop: Platform.OS === "ios" ? -50 : -40 }}
                >
                  <AddSquare color={appColor.white} size={24} variant="Bold" />
                </CircleComponent>
              );
              break;

            default:
              break;
          }

          return icon;
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
        tabBarLabel({ focused }) {
          return route.name === "Add" ? null : (
            <TextComponent
              text={route.name}
              flex={0}
              size={12}
              color={focused ? appColor.primary : appColor.gray5}
              styles={{
                marginBottom: Platform.OS === "ios" ? 0 : 12,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Events" component={EventNavigator} />
      <Tab.Screen name="Add" component={AddNewScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
