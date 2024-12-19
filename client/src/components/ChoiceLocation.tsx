import { ArrowRight2, Flag, Location } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { appColor } from "../constants/appColor";
import { globalStyles } from "../styles/gloabalStyles";
import RowComponent from "./RowComponent";
import SpaceComponent from "./SpaceComponent";
import TextComponent from "./TextComponent";
import { StyleSheet } from "react-native";
import { ModalLocation } from "../modals";

interface Props {
  onSelect: (val: {
    address: string;
    position: { lat: number; lng: number };
  }) => void;
}

const ChoiceLocation = (props: Props) => {
  const { onSelect } = props;
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false);
  const [addressSelected, setAddressSelected] = useState<{
    address: string;
    position: { lat: number; lng: number };
  }>();

  useEffect(() => {
    addressSelected && onSelect(addressSelected);
  }, [addressSelected]);
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
        <TextComponent
          numberOfLine={1}
          text={`${addressSelected ? addressSelected.address : "Choice"}`}
          flex={1}
        />
        <ArrowRight2 color={appColor.primary} size={22} />
      </RowComponent>

      <ModalLocation
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={(val: any) => setAddressSelected(val)}
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
