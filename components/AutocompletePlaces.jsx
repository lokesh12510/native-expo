import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "../constants";
import { useSelector } from "react-redux";
import { colors, SIZES } from "../theme/AppTheme";
import { getAddress } from "../utils/getAddress";
import MapView, { Callout, Circle, Marker } from "react-native-maps";

const AutocompletePlaces = ({ radius }) => {
	const { isLocated, location: currenLocation } = useSelector((state) => state.user);
	// Get current Location
	const [location, setLocations] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	const [selectedAddress, setSelectedAddress] = useState("");

	const [latLang, setLatLang] = useState({
		latitude: 11.0067712,
		longitude: 76.955648,
		// latitude: "",
		// longitude: "",
		latitudeDelta: 0.0988,
		longitudeDelta: 0.0221,
	});

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
						placeholder="Search Location..."
						fetchDetails={true}
						keepResultsAfterBlur={true}
						keyboardShouldPersistTaps={"always"}
						keyboardDismissMode="on-drag"
						selectProps={{
							defaultInputValue: selectedAddress,
							onchange: (address) => {
								setAddress(address);
								setSelectedAddress(address);
							},
						}}
						GooglePlacesSearchQuery={{
							rankby: "distance",
						}}
						onPress={(data, details = null) => {
							// 'details' is provided when fetchDetails = true
							console.log(data);
							setSelectedAddress(data.description);

							setLatLang({
								latitude: details.geometry.location.lat,
								longitude: details.geometry.location.lng,
								latitudeDelta: 0.0988,
								longitudeDelta: 0.0221,
							});
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
		borderTopWidth: 0,
		flex: 1,
		borderBottomWidth: 0,
	},
	textInput: {
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: colors.lightGray,
		height: 55,
		color: "#000",
		fontSize: 16,
		width: "100%",
		backgroundColor: colors.lightGray,
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
});
