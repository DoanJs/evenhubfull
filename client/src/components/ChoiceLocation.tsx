import { ArrowRight2, Flag, Location } from "iconsax-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { appColor } from "../constants/appColor";
import { globalStyles } from "../styles/gloabalStyles";
import RowComponent from "./RowComponent";
import SpaceComponent from "./SpaceComponent";
import TextComponent from "./TextComponent";
import { StyleSheet } from "react-native";
import { ModalLocation } from "../modals";

const ChoiceLocation = () => {
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false);
  return (
    <>
      <RowComponent
        onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)}
        styles={[globalStyles.inputContainer]}
      >
        <View style={[styles.card]}>
          <View
            style={[
              {
                ...styles.card,
                backgroundColor: "#ffffff",
                width: 30,
                height: 30,
              },
            ]}
          >
            <Location size={22} color={appColor.primary} />
          </View>
        </View>
        <SpaceComponent width={12} />
        <TextComponent text="NewYork, USA" flex={1} />
        <ArrowRight2 color={appColor.primary} size={22} />
      </RowComponent>

      <ModalLocation
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={(val: string) => console.log(val)}
      />
    </>
  );
};

export default ChoiceLocation;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e6e9ff",
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
