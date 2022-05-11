import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

import theme, { colors } from "../AppTheme";

const StyledTextField = ({ label, icon, setHidePass, hidePass, isPassword, mode, helperText, ...props }) => {
	return (
		<View style={styles.textContainer}>
			<TextInput style={styles.input} label={label} mode={mode} outlineColor={theme.colors.lightGray} {...props} />
			{helperText && <Text style={styles.helperText}>{helperText}</Text>}
		</View>
	);
};

export default StyledTextField;

const styles = StyleSheet.create({
	textContainer: {
		marginBottom: 15,
	},
	input: {
		marginBottom: 5,
	},
	helperText: {
		color: colors.primary,
		fontSize: 14,
	},
});
