import { ArrowDown2 } from "iconsax-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from "../constants/appColor";
import { fontFamilies } from "../constants/fontFamilies";
import { SelectModel } from "../models/SelectModel";
import { globalStyles } from "../styles/gloabalStyles";
import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import RowComponent from "./RowComponent";
import SpaceComponent from "./SpaceComponent";
import TextComponent from "./TextComponent";

interface Props {
  label?: string;
  values: SelectModel[];
  selected?: string | string[];
  onSelect: (val: string | string[]) => void;
  multiple?: boolean;
}

const DropdownPicker = (props: Props) => {
  const { label, onSelect, selected, values, multiple } = props;
  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
  const modalizeRef = useRef<Modalize>(null);
  const [searchKey, setSearchKey] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  //   su dung isVisibleModalize de mo modalize
  useEffect(() => {
    if (isVisibleModalize) {
      modalizeRef.current?.open();
    }
  }, [isVisibleModalize]);

  useEffect(() => {
    onSelect(selectedItems);
  }, [selectedItems]);

  const handleSelectedItems = (label: string) => {
    let list = [...selectedItems];
    const indexID = list.indexOf(label);
    if (indexID !== -1) {
      list.splice(indexID, 1);
    } else {
      list.push(label);
    }

    setSelectedItems(list);
  };

  const renderSelectItem = (item: SelectModel, index: number) => {
    return (
      <RowComponent
        onPress={
          multiple
            ? () => handleSelectedItems(item.label)
            : () => {
                modalizeRef.current?.close();
                onSelect(item.label);
              }
        }
        key={item.value}
        justify="flex-start"
        styles={[localStyles.listItem, {}]}
      >
        {multiple && (
          <Image
            source={{
              uri:
                item.urlImg ??
                "https://cdn.vectorstock.com/i/1000v/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg",
            }}
            height={30}
            width={30}
            style={[localStyles.selectedImg]}
          />
        )}
        <TextComponent
          text={item.label}
          color={
            selected && selected?.length > 0 && selected?.includes(item.label)
              ? appColor.primary
              : appColor.text
          }
          font={
            selected && selected?.length > 0 && selected?.includes(item.label)
              ? fontFamilies.medium
              : fontFamilies.regular
          }
        />
        <SpaceComponent width={4} />
        {selected && selected?.length > 0 && selected?.includes(item.label) && (
          <MaterialCommunityIcons
            name="checkbox-marked-circle-outline"
            size={18}
            color={appColor.primary}
          />
        )}
      </RowComponent>
    );
  };

  return (
    <View
      style={{
        marginBottom: 8,
      }}
    >
      {label && <TextComponent text={label} styles={{ marginBottom: 8 }} />}

      <RowComponent
        styles={[globalStyles.inputContainer]}
        onPress={() => setIsVisibleModalize(true)}
      >
        <RowComponent styles={[{ flex: 1, flexWrap: "wrap" }]} justify="center">
          {selected ? (
            selectedItems.length > 0 ? (
              selectedItems.map((item, index) => (
                <RowComponent key={index} styles={[localStyles.selectedItem]}>
                  <TextComponent
                    text={item && item.split("@") && item.split("@")[0]}
                    flex={1}
                    color={appColor.primary}
                  />
                  <SpaceComponent width={8} />
                  <TouchableOpacity
                    onPress={() => {
                      handleSelectedItems(item);
                      onSelect(item);
                    }}
                  >
                    <AntDesign name="close" color={appColor.text} size={20} />
                  </TouchableOpacity>
                </RowComponent>
              ))
            ) : (
              <TextComponent
                text={values.find((e) => e.label === selected)?.label ?? ""}
              />
            )
          ) : (
            <TextComponent text="Select" styles={{ textAlign: "center" }} />
          )}
        </RowComponent>
        <SpaceComponent width={16} />
        <ArrowDown2 size={22} color={appColor.gray} />
      </RowComponent>

      <Portal>
        <Modalize
          ref={modalizeRef}
          onClose={() =>
            setIsVisibleModalize(false)
          } /*adjustToContentHeight handlePosition="inside"*/
          HeaderComponent={
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 30,
              }}
            >
              <RowComponent>
                <View style={{ flex: 1 }}>
                  <InputComponent
                    allowClear
                    styles={{ marginBottom: 0 }}
                    placeholder="Search..."
                    value={searchKey}
                    onChange={(val: string) => setSearchKey(val)}
                  />
                </View>
                <SpaceComponent width={20} />
                <ButtonComponent
                  type="link"
                  text="Cancel"
                  onPress={() => modalizeRef.current?.close()}
                />
              </RowComponent>
            </View>
          }
          FooterComponent={
            multiple && (
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 30,
                  alignItems: "center",
                }}
              >
                <ButtonComponent
                  disable={selectedItems.length === 0}
                  type="primary"
                  text="Agree"
                  onPress={() => {
                    onSelect(selectedItems);
                    modalizeRef.current?.close();
                  }}
                />
              </View>
            )
          }
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
        >
          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            {values.map((item: SelectModel, index: number) =>
              renderSelectItem(item, index)
            )}
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

export default DropdownPicker;

const localStyles = StyleSheet.create({
  listItem: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    padding: 4,
  },
  selectedItem: {
    borderWidth: 0.5,
    borderColor: appColor.gray,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    marginRight: 8,
    borderRadius: 8,
  },
  selectedImg: {
    borderRadius: 100,
    marginRight: 10,
    borderRightColor: appColor.gray,
  },
});
