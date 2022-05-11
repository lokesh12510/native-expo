import { View, Text, StyleSheet, BackHandler, Alert } from "react-native";
import React, { useEffect } from "react";
import theme from "../../../theme/AppTheme";
import { Button } from "react-native-paper";
import AnimatedLottieView from "lottie-react-native";
import { Success } from "../../../constants/animations";
import { Routes } from "../../../constants/routes";

const { colors } = theme;

const SuccessScreen = ({ navigation }) => {
	// Restrict device back action from moving screen to `confirm order` page
	useEffect(() => {
		const backAction = () => {
			navigation.navigate(Routes.customer.home); // move to home screen
			return true;
		};

		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

		return () => backHandler.remove();
	}, []);

	return (
		<View style={styles.container}>
			<AnimatedLottieView
				source={Success}
				autoPlay
				loop
				colorFilters={[
					{
						keypath: "button",
						color: "#F00000",
					},
					{
						keypath: "Sending Loader",
						color: "#F00000",
					},
				]}
			/>
			<Text style={styles.title}>Your order is placed successfully !</Text>
			<Button
				mode="contained"
				color={colors.secondary}
				style={styles.button}
				onPress={() => navigation.navigate(Routes.customer.myOrders)}
			>
				View Orders
			</Button>
			<Button
				mode="text"
				color={colors.white}
				style={[styles.button, { marginVertical: 20 }]}
				onPress={() => navigation.navigate(Routes.customer.home)}
			>
				Go To Home
			</Button>
		</View>
	);
};

export default SuccessScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: 20,
	},
	title: {
		fontSize: 18,
		color: colors.secondary,
		fontWeight: "bold",
	},
	button: {
		marginVertical: 10,
	},
});
