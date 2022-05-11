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

	return (
		<View style={styles.container}>
			{renderLabel()}
			<Dropdown
				style={[styles.dropdown, props.isFocus && { borderColor: colors.primary }]}
				placeholderStyle={styles.placeholderStyle}
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
	);
};

export default SelectField;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f1f1f1",
		marginBottom: 16,
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
		fontSize: 13,
		color: colors.gray,
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
});

const lists = [
	{ label: "5", value: "5" },
	{ label: "10", value: "10" },
	{ label: "15", value: "15" },
	{ label: "20", value: "20" },
	{ label: "25", value: "25" },
	{ label: "30", value: "30" },
	{ label: "35", value: "35" },
	{ label: "40", value: "40" },
	{ label: "45", value: "45" },
	{ label: "50", value: "50" },
];
