import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "../theme/AppTheme";
import { Dropdown } from "react-native-element-dropdown";
const { colors } = theme;

const SelectField = (props) => {
	const renderLabel = () => {
		if (props.value || props.isFocus) {
			return (
				<Text style={[styles.label, props.isFocus && { color: colors.primary, backgroundColor: "#fff" }]}>{props.label}</Text>
			);
		}
		return null;
	};

	console.log(props.value);

	return (
		<View style={styles.selectContainer}>
			<View style={styles.container}>
				{renderLabel()}
				<Dropdown
					style={[styles.dropdown, props.isFocus && { borderColor: colors.primary }, props.error && { borderColor: colors.red }]}
					placeholderStyle={[styles.placeholderStyle, props.error && { color: colors.red }]}
					selectedTextStyle={styles.selectedTextStyle}
					iconStyle={styles.iconStyle}
					data={props.data}
					maxHeight={300}
					labelField="label"
					valueField="value"
					placeholder={!props.isFocus ? props.label : "..."}
					{...props}
					// renderLeftIcon={() => <AntDesign style={styles.icon} color={isFocus ? "blue" : "black"} name="Safety" size={20} />}
				/>
			</View>
			{props.error && <Text style={styles.helperText}>{props.helperText}</Text>}
		</View>
	);
};

export default SelectField;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.lightGray,
	},
	selectContainer: {
		marginBottom: 20,
		marginTop: 5,
	},
	dropdown: {
		height: 55,
		borderRadius: 5,
		borderColor: colors.lightGray,
		borderWidth: 1,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: "absolute",
		backgroundColor: "transparent",
		left: 5,
		top: -8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 12,
		fontWeight: "200",
		color: "#72777c",
	},
	placeholderStyle: {
		fontSize: 16,
		color: colors.gray,
	},
	selectedTextStyle: {
		fontSize: 16,
		color: colors.black,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	helperText: {
		marginVertical: 10,
		color: colors.primary,
	},
});
