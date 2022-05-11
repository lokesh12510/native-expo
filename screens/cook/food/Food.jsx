import { View, Text, Button } from "react-native";
import React from "react";
import { GlobalStyles } from "../../../theme/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Routes } from "../../../constants/routes";

const Food = ({ navigation }) => {
	return (
		<SafeAreaView style={[GlobalStyles.flexColumnCenter, GlobalStyles.container]}>
			<Text>Food</Text>
			<Button title="Settings" onPress={() => navigation.navigate(Routes.cook.settings)} />
		</SafeAreaView>
	);
};

export default Food;
