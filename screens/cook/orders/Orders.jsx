import { View, Text, Button } from "react-native";
import React, { useLayoutEffect } from "react";
import { GlobalStyles } from "../../../theme/Styles";
import { Routes } from "../../../constants/routes";
import { SafeAreaView } from "react-native-safe-area-context";

const Orders = ({ navigation }) => {
	return (
		<SafeAreaView style={[GlobalStyles.flexColumnCenter, GlobalStyles.container]}>
			<Text>Orders</Text>
			<Button title="Settings" onPress={() => navigation.navigate(Routes.cook.settings)} />
		</SafeAreaView>
	);
};

export default Orders;
