import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "../constants";
import { useSelector } from "react-redux";
import { colors, SIZES } from "../theme/AppTheme";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { GlobalStyles } from "../theme/Styles";

const AutocompletePlaces = ({ radius, handleAddress, handleCoords }) => {
	const ref = useRef();
	const { isLocated, location: currenLocation } = useSelector((state) => state.user);
	// Get current Location
	const [location, setLocations] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [selectedAddress, setSelectedAddress] = useState("");

	const [latLang, setLatLang] = useState({
		latitude: 11.0067712,
		longitude: 76.955648,
		// latitude: "",
		// longitude: "",
		latitudeDelta: 0.0988,
		longitudeDelta: 0.0221,
	});

	// Checking user permission for location
	useEffect(async () => {
		setIsLoading(true);
		if (isLocated) {
			// if user already has current location
			setLatLang({
				latitude: currenLocation.latitude,
				longitude: currenLocation.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			});

			handleCoords(currenLocation.latitude, currenLocation.longitude);

			let address = await getAddress(currenLocation.latitude, currenLocation.longitude);
			console.log(address, "isLocated");
			setSelectedAddress(address);
			handleAddress(address);
			setIsLoading(false);
		} else {
			// else access location from device and set current location
			(async () => {
				let { status } = await Location.requestForegroundPermissionsAsync();

				// alert popup for user to grand permission to access location (* Mandatory!)
				if (status !== "granted") {
					setErrorMsg("Permission to access location was denied");
					Alert.alert("Permission not granted", "Allow the app to use location service.", [{ text: "OK" }], {
						cancelable: false,
					});
					return;
				}

				// Access location from device
				handleCurrentLocation();
			})();
		}
	}, []);

	// get Current Location
	const handleCurrentLocation = async () => {
		setIsLoading(true);
		// Access location
		let location = await Location.getCurrentPositionAsync({});
		setLocations(location);

		// set lat long
		setLatLang({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
		handleCoords(location.coords.latitude, location.coords.longitude);

		let address = await getAddress(location.coords.latitude, location.coords.longitude);

		// set address~
		setSelectedAddress(address);
		handleAddress(address);

		setIsLoading(false);
	};

	if (errorMsg) {
		console.log(errorMsg);
	} else if (location) {
		console.log(location, "location");
	}

	// get current address based on lat and lon
	const getAddress = async (lat, lon) => {
		try {
			fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + lat + "," + lon + "&key=" + GOOGLE_MAPS_API_KEY)
				.then((response) => response.json())
				.then((responseJson) => {
					let address = responseJson?.results[0]?.formatted_address;
					console.log(address);
					setSelectedAddress(address);
					handleAddress(address);
					ref.current?.setAddressText("");
				});
		} catch (e) {
			console.log("errors:", e);
		}
	};

	return (
		<View style={{ flex: 1, width: "100%", zIndex: 22, height: "100%", position: "relative" }}>
			<ScrollView
				horizontal={false}
				contentContainerStyle={{ flex: 1, width: "100%", zIndex: 22 }}
				keyboardShouldPersistTaps={"always"}
				keyboardDismissMode="on-drag"
			>
				<ScrollView
					horizontal={true}
					contentContainerStyle={{ width: "100%", zIndex: 22 }}
					keyboardShouldPersistTaps={"always"}
					keyboardDismissMode="on-drag"
				>
					<GooglePlacesAutocomplete
						ref={ref}
						placeholder="Search Location..."
						fetchDetails={true}
						keepResultsAfterBlur={true}
						keyboardShouldPersistTaps={"always"}
						keyboardDismissMode="on-drag"
						enablePoweredByContainer={false}
						clearButtonMode={"always"}
						GooglePlacesSearchQuery={{
							fields: "geometry",
						}}
						renderLeftButton={() => (
							<View style={{ width: 55, flexDirection: "row", justifyContent: "center" }}>
								<MaterialCommunityIcons name="map-search" size={25} color={colors.primary} />
							</View>
						)}
						onPress={(data, details = null) => {
							// 'details' is provided when fetchDetails = true
							console.log(data);
							setSelectedAddress(data.description);
							handleAddress(data.description);

							setLatLang({
								latitude: details.geometry.location.lat,
								longitude: details.geometry.location.lng,
								latitudeDelta: 0.0988,
								longitudeDelta: 0.0221,
							});

							handleCoords(details.geometry.location.lat, details.geometry.location.lng);

							ref.current?.setAddressText("");
						}}
						query={{
							key: GOOGLE_MAPS_API_KEY,
							language: "en",
							types: "establishment",
							components: "country:IN",
							radius: 30000,
							location: `${latLang.latitude}, ${latLang.longitude}`,
						}}
						styles={styles}
					/>
				</ScrollView>
			</ScrollView>
			{!isLoading && selectedAddress ? (
				<View style={{ flex: 1, padding: 16, borderWidth: 0.4, borderColor: "#ccc" }}>
					<Text style={styles.title}>Selected Address</Text>
					<Text>{selectedAddress}</Text>
				</View>
			) : (
				<View style={{ paddingVertical: 20 }}>
					<ActivityIndicator size="small" color={colors.primary} />
				</View>
			)}

			<MapView
				style={styles.mapView}
				initialRegion={{
					latitude: latLang?.latitude,
					longitude: latLang?.longitude,
					latitudeDelta: 0.0988,
					longitudeDelta: 0.0221,
				}}
				region={{
					latitude: latLang?.latitude,
					longitude: latLang?.longitude,
					latitudeDelta: 0.0988,
					longitudeDelta: 0.0221,
				}}
				provider="google"
			>
				{radius && (
					<Circle
						center={{
							latitude: latLang?.latitude,
							longitude: latLang?.longitude,
						}}
						fillColor={`${colors.primary}33`}
						strokeWidth={1}
						strokeColor={colors.primary}
						radius={Number(radius) * 100}
					/>
				)}

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
							latitudeDelta: 0.0988,
							longitudeDelta: 0.0221,
						});
						getAddress(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
						handleCoords(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
					}}
				>
					<Callout>
						<Text>Your Location</Text>
					</Callout>
				</Marker>
			</MapView>
		</View>
	);
};

export default AutocompletePlaces;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		zIndex: 22,
	},
	textInputContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.lightGray,
	},
	textInput: {
		borderRadius: 5,
		borderWidth: 0,
		height: 55,
		color: "#000",
		fontSize: 16,
		width: "100%",
		backgroundColor: colors.lightGray2,
	},

	predefinedPlacesDescription: {
		color: "#1faadb",
	},
	mapView: {
		width: "100%",
		flex: 1,
		minHeight: 360,
		backgroundColor: colors.lightGray,
		marginBottom: 20,
	},
	title: {
		fontSize: 18,
		color: colors.black,
		marginBottom: 10,
		fontWeight: "bold",
	},
});
