import { useReactiveVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View } from "react-native";
import { ButtonComponent } from "../../components";
import { tokenVar, userVar } from "../../graphqlClient/cache";

const ProfileScreen = () => {
  const user = useReactiveVar(userVar);

  const handleLogout = async () => {
    await AsyncStorage.setItem("auth", user ? user.Email : "");
    await AsyncStorage.removeItem("accessToken");
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
