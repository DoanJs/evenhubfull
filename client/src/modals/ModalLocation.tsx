import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from "../components";
import { appColor } from "../constants/appColor";
import { SearchNormal } from "iconsax-react-native";
import axios from "axios";
import { LocationModel } from "../models/LocationModel";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: string) => void;
}

const ModalLocation = (props: Props) => {
  const { visible, onClose, onSelect } = props;
  const [searchKey, setSearchKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);

  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    }
  }, [searchKey]);

  const handleClose = () => {
    onClose();
  };

  const handleSearchLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=10&apiKey=ZPutiMhrZbuL1-Asb4NriJsqiVqvVWxpKXtNMqUyULg`;

    try {
      setIsLoading(true);
      const res = await axios(api);
      if (res && res.data && res.status === 200) {
        setLocations(res.data.items);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Modal animationType="slide" visible={visible} style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 42,
          paddingHorizontal: 20,
        }}
      >
        <RowComponent justify="flex-end" styles={{ marginVertical: 20 }}>
          <View style={{ flex: 1 }}>
            <InputComponent
              allowClear
              affix={<SearchNormal size={20} color={appColor.gray} />}
              placeholder="Search..."
              value={searchKey}
              onChange={(val) => setSearchKey(val)}
              styles={{ marginBottom: 0 }}
              onEnd={handleSearchLocation}
            />
          </View>
          <SpaceComponent width={12} />
          <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
        </RowComponent>

        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : locations.length > 0 ? (
            <FlatList
              data={locations}
              renderItem={({ item }) => (
                <View>
                  <TextComponent text={item.address.label} />
                </View>
              )}
            />
          ) : (
            <View>
              <TextComponent text={searchKey ? "Location not found !" : ""} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalLocation;
