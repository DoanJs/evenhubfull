import * as ImagePicker from "expo-image-picker";
import { Camera, Image, Link } from "iconsax-react-native";
import React, { ReactNode, useRef, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import AntDesign from "react-native-vector-icons/AntDesign";
import { appColor } from "../constants/appColor";
import { fontFamilies } from "../constants/fontFamilies";
import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import RowComponent from "./RowComponent";
import SpaceComponent from "./SpaceComponent";
import TextComponent from "./TextComponent";

interface Props {
  onSelect: (type: "url" | "file", value: any) => void;
}

const ButtonImagePicker = (props: Props) => {
  const { onSelect } = props;
  const choiceImages = [
    {
      key: "camera",
      title: "Take a picture",
      icon: <Camera size={22} color={appColor.text} />,
    },
    {
      key: "library",
      title: "From library",
      icon: <Image size={22} color={appColor.text} />,
    },
    {
      key: "url",
      title: "From url",
      icon: <Link size={22} color={appColor.text} />,
    },
  ];
  const [imageUrl, setImageUrl] = useState("");
  const [isVisibleUrl, setIsVisibleUrl] = useState(false);
  const modalizeRef = useRef<Modalize>();
  const optionImagePicker: ImagePicker.ImagePickerOptions = {
    // mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    // allowsMultipleSelection: true
  };
  const renderItem = (item: {
    key: string;
    icon: ReactNode;
    title: string;
  }) => (
    <RowComponent
      key={item.key}
      styles={{ marginBottom: 20 }}
      onPress={() => handleChoiceImgae(item.key)}
    >
      {item.icon}
      <SpaceComponent width={12} />
      <TextComponent text={item.title} font={fontFamilies.bold} />
    </RowComponent>
  );

  const openCamera = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.granted === false) {
      alert("You've refused to allow this app to access your photos!");
    } else {
      const result = await ImagePicker.launchCameraAsync();

      // if (!result.cancelled) {
      //   uploadImage(result.uri)
      // }
      onSelect("file", result.assets && result.assets[0]);
    }
  };

  const handleChoiceImgae = (key: string) => {
    switch (key) {
      case "library":
        ImagePicker.launchImageLibraryAsync(optionImagePicker).then((res) =>
          onSelect("file", res.assets && res.assets[0])
        );
        break;
      case "camera":
        openCamera();
        break;
      default:
        setIsVisibleUrl(true);
        break;
    }

    modalizeRef.current?.close();
  };

  // ---

  // const uploadImageAsync = async (uri: any) => {
  //   // Why are we using XMLHttpRequest? See:
  //   // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function (e) {
  //       console.log(e);
  //       reject(new TypeError("Network request failed"));
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("GET", uri, true);
  //     xhr.send(null);
  //   });

  //   const fileRef = ref(getStorage(), uuidv4());
  //   const result = await uploadBytes(fileRef, blob);

  //   // We're done with the blob, close and release it
  //   blob.close();

  //   return await getDownloadURL(fileRef);
  // }

  // const _handleImagePicked = async (pickerResult) => {
  //   const uploadUrl = await uploadImageAsync(pickerResult.uri)
  // };

  return (
    <View style={{ marginBottom: 20 }}>
      <ButtonComponent
        type="link"
        text="Upload image"
        onPress={() => modalizeRef.current?.open()}
      />

      <Portal>
        <Modalize
          adjustToContentHeight
          ref={modalizeRef}
          handlePosition="inside"
        >
          <View style={{ marginVertical: 30, paddingHorizontal: 20 }}>
            {choiceImages.map((item) => renderItem(item))}
          </View>
        </Modalize>
      </Portal>

      <Modal
        visible={isVisibleUrl}
        transparent
        style={{ flex: 1 }}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: appColor.white,
              margin: 20,
              borderRadius: 12,
              width: "90%",
              padding: 20,
            }}
          >
            <RowComponent justify="flex-end">
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleUrl(false);
                  setImageUrl("");
                }}
              >
                <AntDesign name="close" size={24} color={appColor.text} />
              </TouchableOpacity>
            </RowComponent>
            <TextComponent text="Image URL" title size={18} />
            <SpaceComponent height={10} />
            <InputComponent
              placeholder="URL"
              value={imageUrl}
              allowClear
              onChange={(val: string) => setImageUrl(val)}
            />
            <RowComponent justify="flex-end">
              <ButtonComponent
                text="Agree"
                type="link"
                onPress={() => {
                  setIsVisibleUrl(false);
                  onSelect("url", imageUrl);
                  setImageUrl("");
                }}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ButtonImagePicker