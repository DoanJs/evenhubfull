import axios from "axios";
import * as Location from "expo-location";
import { SearchNormal } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from "../components";
import { appColor } from "../constants/appColor";
import { appInfo } from "../constants/appInfos";
import { Position } from "../models/AddressModel";
import { LocationModel } from "../models/LocationModel";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: {
    address: string;
    position?: {
      lat?: number;
      lng?: number;
    };
  }) => void;
}

const ModalLocation = (props: Props) => {
  const { visible, onClose, onSelect } = props;
  const [searchKey, setSearchKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [addressSelected, setAddressSelected] = useState("");
  const [currentLocation, setCurrentLocation] = useState<Position>();

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      // setLocation(location);
      location &&
        setCurrentLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    const handleGeocodeAsync = async (address: string) => {
      await Location.geocodeAsync(address)
        .then((data) =>
          setCurrentLocation({
            lat: data[0].latitude,
            lng: data[0].longitude,
          })
        )
        .catch((err) => console.log("ModalLocation err: ", err));
    };
    addressSelected && handleGeocodeAsync(addressSelected);
  }, [addressSelected]);

  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    }
  }, [searchKey]);

  const handleClose = () => {
    onClose();
  };
  const handleSearchLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=20&lang=vi-VI&apiKey=ZPutiMhrZbuL1-Asb4NriJsqiVqvVWxpKXtNMqUyULg`;

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
  const handleGetAddressFromPossition = async ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    await Location.reverseGeocodeAsync({ latitude, longitude })
      .then((data) => {
        onSelect({
          address: data[0].formattedAddress as string,
          position: {
            lat: latitude,
            lng: longitude,
          },
        });
        onClose();
      })
      .catch((err) => console.log(err));
  };


  return (
    <Modal animationType="slide" visible={visible} style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 42,
          flex: 1,
        }}
      >
        <RowComponent
          justify="flex-end"
          styles={{ marginVertical: 20, marginHorizontal: 10, zIndex: 5 }}
        >
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
            <View
              style={{
                top: 60,
                right: 10,
                left: 10,
                position: "absolute",
                backgroundColor: appColor.white,
                paddingHorizontal: 10,
              }}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : locations.length > 0 ? (
                <FlatList
                  data={locations}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ marginBottom: 12 }}
                      onPress={() => {
                        setAddressSelected(item.address.label);
                        setSearchKey("");
                      }}
                    >
                      <TextComponent text={item.address.label} />
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View>
                  <TextComponent
                    text={searchKey ? "Location not found !" : ""}
                  />
                </View>
              )}
            </View>
          </View>
          <SpaceComponent width={12} />
          <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
        </RowComponent>

        <View>
          {currentLocation && (
            <MapView
              style={[styles.map]}
              initialRegion={{
                latitude: currentLocation.lat as number,
                longitude: currentLocation.lng as number,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={{
                latitude: currentLocation.lat as number,
                longitude: currentLocation.lng as number,
                latitudeDelta: 0.001,
                longitudeDelta: 0.015,
              }}
              showsUserLocation
              showsMyLocationButton={true}
              followsUserLocation={true}
              showsCompass={true}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={true}
              rotateEnabled={true}
              mapType="standard"
              onPress={(val) =>
                handleGetAddressFromPossition({
                  latitude: val.nativeEvent.coordinate.latitude,
                  longitude: val.nativeEvent.coordinate.longitude,
                })
              }
            />
          )}
        </View>
      </View>
      <RowComponent justify="center">
        <ButtonComponent
          type="primary"
          text="Confirm"
          onPress={() => {
            onSelect({
              address: addressSelected,
              position: currentLocation,
            });
            onClose();
          }}
        />
      </RowComponent>
    </Modal>
  );
};

export default ModalLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: appInfo.sizes.WIDTH,
    height: 800,
    zIndex: -1,
    marginTop: 40,
  },
});
