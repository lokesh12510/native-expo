import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import theme from "../AppTheme";

const { colors, SIZES, fonts } = theme;

export default function IconBtn(props) {
	const { onPress, disabled } = props;
	return (
		<View>
			<Pressable
				disabled={disabled}
				style={({ pressed }) => [styles.container, pressed && styles.pressed]}
				onPress={onPress}
				android_ripple={{ color: "#ccc", foreground: true }}
			>
				{props.children}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
		padding: 5,
	},

	pressed: {
		opacity: 0.8,
		elevation: 8,
	},
});
