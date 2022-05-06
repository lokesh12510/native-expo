import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import theme from "../../../theme/AppTheme";
import StyledTextField from "../../../theme/uiSinppets/StyledTextField";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledBtn from "../../../theme/uiSinppets/StyledBtn";
import { useLayoutEffect } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { IconButton } from "react-native-paper";
import MapView, { Marker, Callout, Circle } from "react-native-maps";
import { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "../../../constants";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../../app/slices/userSlice";

const { colors } = theme;

const LocationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  // Get current Location
  const [location, setLocations] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState("");

  const [latLang, setLatLang] = useState({
    // latitude: 11.0067712,
    // longitude: 76.955648,
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Checking user permission for location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Alert.alert(
          "Permission not granted",
          "Allow the app to use location service.",
          [{ text: "OK" }],
          { cancelable: false }
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocations(location);

      setLatLang({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      let address = await getAddress(
        location.coords.latitude,
        location.coords.longitude
      );

      console.log(address);

      setSelectedAddress(address);
    })();
  }, []);

  if (errorMsg) {
    console.log(errorMsg);
  } else if (location) {
    console.log(location);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: authToken ? true : false,
      headerTitle: () => {
        return (
          <View style={{ flex: 1, position: "relative" }}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              GooglePlacesSearchQuery={{
                rankby: "distance",
              }}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setSelectedAddress(data.description);

                setLatLang({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en",
                types: "establishment",
                components: "country:IN",
                radius: 30000,
                location: `${location?.coords.latitude}, ${location?.coords.longitude}`,
              }}
              styles={{
                container: {
                  flex: 1,
                  position: "absolute",
                  width: "100%",
                  zIndex: 1,
                  // padding: 15,
                  // marginTop: 20,
                  borderWidth: 1,
                },
                listView: { backgroundColor: "white" },
              }}
            />
          </View>
        );
      },
    });
  }, []);

  const handleSetLocation = () => {
    // console.log({ location: latLang, address: selectedAddress });
    dispatch(setLocation({ location: latLang, address: selectedAddress }));
  };

  console.log(selectedAddress);

  // get current location based on lat and lon
  const getAddress = async (lat, lon) => {
    try {
      // let address = await Location.reverseGeocodeAsync({
      //   latitude: lat,
      //   longitude: lon,
      // });
      // return address;
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          lat +
          "," +
          lon +
          "&key=" +
          GOOGLE_MAPS_API_KEY
      )
        .then((response) => response.json())
        .then((responseJson) => {
          let address = responseJson?.results[0]?.formatted_address;
          console.log(address);
          setSelectedAddress(address);
        });
    } catch (e) {
      console.log("errors:", e);
    }
  };

  return (
    <View style={styles.container}>
      {location && (
        <View style={styles.mapView}>
          {/* Google Places Container */}

          {/* Google Places Container */}
          {/* Map View Container */}
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: latLang?.latitude,
              longitude: latLang?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: latLang?.latitude,
              longitude: latLang?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: latLang?.latitude,
                longitude: latLang?.longitude,
              }}
              draggable={true}
              onDragEnd={(e) => {
                setLatLang({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
                getAddress(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude
                );
              }}
            >
              <Callout>
                <Text>Your Location</Text>
              </Callout>
            </Marker>
          </MapView>
          {/* Map View Container */}
        </View>
      )}

      <View>
        <View style={styles.bottomModalContainer}>
          {selectedAddress !== "" && (
            <>
              <Text style={styles.title}> Selected Location</Text>
              <View>
                <View style={styles.flexStart}>
                  <MaterialIcons
                    name="location-on"
                    size={30}
                    color={colors.primary}
                    style={{ paddingRight: 10 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text>{selectedAddress}</Text>
                  </View>
                </View>
              </View>
            </>
          )}

          <View>
            {selectedAddress ? (
              <StyledBtn
                title={authToken ? "Change" : "Proceed"}
                type="contained"
                onPress={handleSetLocation}
              />
            ) : (
              <StyledBtn
                title={"Locate Current Address"}
                type="outlined"
                onPress={() =>
                  getAddress(latLang?.latitude, latLang?.longitude)
                }
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  title: {
    marginVertical: 7,
    color: colors.gray,
    fontWeight: "bold",
  },
  bottomModalContainer: {
    padding: 16,
    backgroundColor: colors.white,
    width: "100%",
  },
  mapView: {
    flex: 1,
    position: "relative",
  },
  fabBtnWrapper: {
    borderRadius: 50,
    overflow: "hidden",
    position: "absolute",
    bottom: 16,
    right: 16,
    elevation: 6,
    backgroundColor: colors.primary,
  },
  fabBtn: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  flexStart: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 1,
    padding: 1,
    marginBottom: 15,
  },
});
