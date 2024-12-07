import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddSquare, Calendar, Location, User } from "iconsax-react-native";
import React, { ReactNode } from "react";
import { Platform, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CircleComponent, TextComponent } from "../components";
import { appColor } from "../constants/appColor";
import { AddNewScreen } from "../screens";
import EventNavigator from "./EventNavigator";
import ExploreNavigator from "./ExploreNavigator";
import MapNavigator from "./MapNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";

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
                  size={52}
                  styles={{ marginTop: Platform.OS === "ios" ? -50 : -40 }}
                >
                  <AddSquare color={appColor.white} size={24} variant="Bold" />
                </CircleComponent>
              );
              // icon = (
              //   <View
              //     style={{
              //       width: 52,
              //       height: 52,
              //       borderRadius: 100,
              //       backgroundColor: appColor.primary,
              //       justifyContent: "center",
              //       alignItems: "center",
              //       marginTop: Platform.OS === "ios" ? -50 : -40,
              //     }}
              //   >

              //   </View>
              // );
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
