import { useReactiveVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ArrowDown, HambergerMenu, Notification } from "iconsax-react-native";
import React from "react";
import { Platform, StatusBar, TouchableOpacity, View } from "react-native";
import { CircleComponent, RowComponent, TextComponent } from "../../components";
import { appColor } from "../../constants/appColor";
import { userVar } from "../../graphqlClient/cache";
import { globalStyles } from "../../styles/gloabalStyles";
import { fontFamilies } from "../../constants/fontFamilies";

const HomeScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const auth = useReactiveVar(userVar);

  const handleLogout = async () => {
    await AsyncStorage.setItem("auth", auth ? auth.Email : "");
    await AsyncStorage.removeItem("accessToken");
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          backgroundColor: appColor.primary,
          height: 179,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === "ios" ? 42 : 10,
          paddingHorizontal: 16,
        }}
      >
        <RowComponent>
          <TouchableOpacity>
            <HambergerMenu size={24} color={appColor.white} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <RowComponent>
              <TextComponent text="Current Location" color={appColor.white2} size={12} />
              <ArrowDown size={20} color={appColor.white} />
            </RowComponent>
            <TextComponent
              text="New Yourk, USA"
              color={appColor.white}
              font={fontFamilies.bold}
              size={13}
            />
          </View>
          <CircleComponent color='#524ce0' size={36}>
            <Notification size={18} color={appColor.white}/>
          </CircleComponent>
        </RowComponent>
        <View
          style={[
            {
              backgroundColor: "#dadada",
            },
          ]}
        ></View>
      </View>
    </View>
  );
};

export default HomeScreen;
