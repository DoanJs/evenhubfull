import { useReactiveVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { ButtonComponent } from "../../components";
import { tokenVar, userVar } from "../../graphqlClient/cache";

const ProfileScreen = () => {
  const user = useReactiveVar(userVar);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const handleLogout = async () => {
    const getToken = await AsyncStorage.getItem('accessToken')
    await AsyncStorage.setItem("auth", user ? user.Email : "");
    await AsyncStorage.removeItem("accessToken");
    console.log(getToken)
    if(!getToken) {
      console.log('tu profilescreen')
      navigation.navigate("LoginScreen");
    }
    tokenVar("");
  };
  return (
    <View>
      <Text>ProfileScreen</Text>
      <ButtonComponent
        onPress={() => handleLogout()}
        type="primary"
        text="Logout"
      />
    </View>
  );
};

export default ProfileScreen;
