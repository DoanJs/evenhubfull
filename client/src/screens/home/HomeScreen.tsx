import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";
import { userVar } from "../../graphqlClient/cache";
import { useReactiveVar } from "@apollo/client";

const HomeScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const auth = useReactiveVar(userVar);

  const handleLogout = async () => {
    await AsyncStorage.setItem("auth", auth ? auth.Email : "");
    await AsyncStorage.removeItem('accessToken')
    navigation.navigate("LoginScreen");
  };
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
