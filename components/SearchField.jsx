import { View, StyleSheet, Pressable, TextInput, Text } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import theme from "../theme/AppTheme";
import KeyboardAvoidWrapper from "../utils/KeyboardAvoidWrapper";

const { darkgray, secondary, black } = theme.colors;

const SearchField = ({ handleChangeText }) => {
	return (
		<KeyboardAvoidWrapper>
			<View style={styles.searchBarContainer}>
				<Pressable style={styles.searchBar} android_ripple={{ color: "#ccc" }}>
					<MaterialIcons style={styles.searchIcon} name="search" size={20} color={darkgray} />
					<TextInput
						style={styles.searchTextField}
						placeholder="Search Food..."
						onChangeText={(text) => handleChangeText(text)}
					/>
				</Pressable>
			</View>
		</KeyboardAvoidWrapper>
	);
};

export default SearchField;

const styles = StyleSheet.create({
	searchBarContainer: {
		marginBottom: 15,
		elevation: 4,
	},
	searchBar: {
		backgroundColor: "#f6f6f6",
		color: black,
		borderRadius: 50,
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		overflow: "hidden",
	},
	searchBarActive: {
		borderColor: secondary,
	},
	searchIcon: {
		paddingHorizontal: 10,
	},
	searchTextField: {
		flex: 1,
		height: 30,
		color: darkgray,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 5,
	},
});
