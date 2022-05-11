import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import theme from "../AppTheme";

const { colors, SIZES, fonts } = theme;

export default function PrimaryBtn(props) {
	const { onPress, title = "Save", isLoading = false, disabled } = props;
	return (
		<View>
			<Pressable
				disabled={disabled}
				style={({ pressed }) => [
					styles.container,
					pressed && styles.pressed,
					disabled && { backgroundColor: colors.darkLight, elevation: 0 },
				]}
				onPress={onPress}
				android_ripple={{ color: "#ccc", foreground: true }}
			>
				{!isLoading ? <Text style={styles.text}>{title}</Text> : <ActivityIndicator color={"#fff"} />}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: SIZES.radius,
		elevation: 3,
		color: colors.white,
		backgroundColor: colors.primary,
		marginBottom: SIZES.margin,
	},
	text: {
		...fonts.body3,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: colors.white,
		textTransform: "uppercase",
	},
	pressed: {
		opacity: 0.8,
		elevation: 8,
	},
});
