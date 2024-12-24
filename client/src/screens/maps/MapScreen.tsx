import { useReactiveVar } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft2 } from "iconsax-react-native";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  CardComponent,
  CategoriesList,
  InputComponent,
  RowComponent,
  SpaceComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { appInfo } from "../../constants/appInfos";
import { currentLocationVar } from "../../graphqlClient/cache";
import { globalStyles } from "../../styles/gloabalStyles";

const MapScreen = () => {
  const navigation: any = useNavigation();
  const currentLocation = useReactiveVar(currentLocationVar);

  return (
    <View style={{ flex: 1 }}>
      {currentLocation && (
        <MapView
          style={[styles.map]}
          initialRegion={{
            latitude: currentLocation.position.lat as number,
            longitude: currentLocation.position.lng as number,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: currentLocation.position.lat as number,
            longitude: currentLocation.position.lng as number,
            latitudeDelta: 0.001,
            longitudeDelta: 0.015,
          }}
          showsUserLocation
          showsMyLocationButton={true}
          // followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          mapType="standard"
          // onPress={(val) =>
          //   handleGetAddressFromPossition({
          //     latitude: val.nativeEvent.coordinate.latitude,
          //     longitude: val.nativeEvent.coordinate.longitude,
          //   })
          // }
        >
          <Marker
            title="asd"
            description="asdas"
            coordinate={{
              latitude: currentLocation.position.lat,
              longitude: currentLocation.position.lng,
            }}
          >
            <View
              style={{
                padding: 8,
                height: 56,
                width: 56,
                backgroundColor: appColor.white,
                justifyContent: "center",
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  backgroundColor: "#f0635a",
                  padding: 8,
                  borderRadius: 12,
                }}
              >
                <FontAwesome5
                  name="basketball-ball"
                  color={appColor.white}
                  size={22}
                  style={{ textAlign: "center" }}
                />
              </View>
              {/* <View style={{
                position: 'absolute',
                borderWidth: 20,
                borderColor: 'red green yellow black',
              }} /> */}
            </View>
          </Marker>
        </MapView>
      )}

      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          padding: 20,
          paddingTop: Platform.OS === "ios" ? 50 : 20,
        }}
      >
        <RowComponent>
          <View style={{ flex: 1 }}>
            <InputComponent
              styles={{ marginBottom: 0 }}
              placeholder="Search"
              onChange={(val) => console.log(val)}
              value=""
              affix={
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Explore", { screen: "HomeScreen" })
                  }
                >
                  <ArrowLeft2 size={24} color={appColor.text} />
                </TouchableOpacity>
              }
            />
          </View>
          <SpaceComponent width={12} />
          <CardComponent
            styles={[
              globalStyles.noSpaceCard,
              { width: 56, height: 56, marginBottom: 0 },
            ]}
            color="#ffffffb3"
          >
            <MaterialIcons
              name="my-location"
              color={appColor.danger2}
              size={22}
            />
          </CardComponent>
        </RowComponent>
        <SpaceComponent height={20} />
        <CategoriesList />
      </View>
    </View>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT,
    zIndex: -1,
  },
});
