import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { userVar } from "../graphqlClient/cache";
import { globalStyles } from "../styles/gloabalStyles";
import RowComponent from "./RowComponent";
import SpaceComponent from "./SpaceComponent";
import TextComponent from "./TextComponent";

const DrawerCustom = (props: any) => {
  const user = useReactiveVar(userVar);
  const { data: Data_user, error } = useQuery(
    gql`
      query ($email: String!) {
        user(email: $email) {
          UserID
          Username
          Password
          Email
          PhotoUrl
        }
      }
    `,
    {
      variables: {
        email: user.Email,
      },
    }
  );
  const [userCurrent, setUserCurrent]: any = useState();

  useEffect(() => {
    if (Data_user) {
      setUserCurrent(Data_user.user);
    }
  }, [Data_user]);
  return (
    <View style={[localStyles.container]}>
      <View>
        {userCurrent?.PhotoUrl ? (
          <Image source={{ uri: userCurrent?.PhotoUrl }} style={localStyles.avatar} />
        ) : (
          <></>
        )}
        <TextComponent text={userCurrent?.Username} />
      </View>
      <View style={{ flex: 1, paddingVertical: 20 }}>
        <Text>Menu container</Text>
      </View>
      <RowComponent justify="flex-start">
        <TouchableOpacity
          style={[
            globalStyles.button,
            { backgroundColor: "#00f8ff33", height: "auto" },
          ]}
        >
          <MaterialCommunityIcons name="crown" size={22} color="#00f8ff" />
          <SpaceComponent width={8} />
          <TextComponent text="Upgrade Pro" color="#00f8ff" />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default DrawerCustom;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === "android" ? StatusBar.currentHeight : 48,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
  },
});
