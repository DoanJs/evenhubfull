import React from "react";
import { Image, StyleProp, ViewStyle } from "react-native";
import { appColor } from "../constants/appColor";
import { fontFamilies } from "../constants/fontFamilies";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
import SpaceComponent from "./SpaceComponent";

interface Props {
  styles?: StyleProp<ViewStyle>;
  size?: number;
  zIndex?: number;
}

const AvatarGroup = (props: Props) => {
  const { styles, size, zIndex } = props;
  const photoUrl =
    "https://e.khoahoc.tv/photos/image/2015/03/09/dong_vat_11.jpg";
  return (
    <RowComponent
      justify="flex-start"
      styles={{
        marginVertical: 12,
      }}
    >
      {Array.from({ length: 3 }).map((item, index) => (
        <Image
          key={`img${index}`}
          source={{ uri: photoUrl }}
          style={{
            height: size ?? 24,
            width: size ?? 24,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: appColor.white,
            marginLeft: index === 0 ? 0 : -8,
            zIndex: zIndex ? zIndex - index : -index,
          }}
        />
      ))}
      <SpaceComponent width={12} />
      <TextComponent
        text="+20 Going"
        color={appColor.primary}
        font={fontFamilies.semiBold}
      />
    </RowComponent>
  );
};

export default AvatarGroup;
