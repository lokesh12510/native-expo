import { View, Text } from "react-native";
import React, { useState } from "react";
import { Snackbar as Snack } from "react-native-paper";
import theme from "../theme/AppTheme";
import { GlobalStyles } from "../theme/Styles";
import { Feather } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../app/slices/snackbarSlice";
const { colors } = theme;

const Snackbar = () => {
	const { isVisible, title, type = "success" } = useSelector((state) => state.snackbar);

	const dispatch = useDispatch();
	const onDismissSnackBar = () => dispatch(hideSnackbar());

	return (
		<Snack
			visible={isVisible}
			onDismiss={onDismissSnackBar}
			duration={1500}
			style={[
				{ backgroundColor: colors.green, elevation: 4, bottom: 0, color: colors.black },
				type === "error" && { backgroundColor: colors.red },
			]}
			// action={{
			// 	label: "Undo",
			// 	onPress: () => {
			// 		// Do something
			// 	},
			// }}
		>
			<View style={GlobalStyles.flexRowStart}>
				<Feather name="check-circle" size={20} color={colors.white} style={{ paddingRight: 10 }} />
				<Text style={{ color: colors.white }}>{title}</Text>
			</View>
		</Snack>
	);
};

export default Snackbar;
