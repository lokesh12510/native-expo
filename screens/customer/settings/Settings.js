import { View, Text } from "react-native";
import React, { useEffect } from "react";

const Settings = ({ navigation }) => {
	const [search, setSearch] = React.useState("");
	useEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				hideWhenScrolling: true,
				inputType: "text",
				onChangeText: (event) => setSearch(event.nativeEvent.text),
			},
		});
	}, [navigation]);
	return (
		<View>
			<Text>Settings</Text>
		</View>
	);
};

export default Settings;
