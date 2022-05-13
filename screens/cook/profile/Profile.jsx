import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { GlobalStyles } from "../../../theme/Styles";
import { Routes } from "../../../constants/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../app/slices/userSlice";
import { authReset } from "../../../app/slices/authSlice";
import { Divider } from "react-native-paper";
import StyledBtn from "../../../theme/uiSinppets/StyledBtn";
import theme from "../../../theme/AppTheme";
import AppImages from "../../../constants/Images";
import { clearFood } from "../../../app/slices/foodSlice";

const { colors } = theme;

const CookProfile = ({ navigation }) => {
	const dispatch = useDispatch();

	const { authToken } = useSelector((state) => state.auth);
	const { profile } = useSelector((state) => state.user);

	const handleLogin = () => {
		navigation.navigate(Routes.auth.customerLogin);
	};

	const handleRegister = () => {
		navigation.navigate(Routes.auth.customerRegister);
	};

	const handleLogout = () => {
		dispatch(authReset());
		dispatch(resetUser());
		dispatch(clearFood());
	};

	return (
		<SafeAreaView style={[GlobalStyles.flexColumnCenter, GlobalStyles.container]}>
			<Text style={GlobalStyles.screenTitle}>Profile</Text>
			<Divider style={GlobalStyles.divider} />

			{authToken && (
				<>
					{profile.image && profile.image !== 1 ? (
						<Image style={styles.image} source={{ uri: profile.image }} />
					) : (
						<Image style={styles.image} source={AppImages.Avatar} />
					)}
					<Text style={styles.label}>Name</Text>
					<Text style={styles.title}>{profile.name}</Text>
					<Text style={styles.label}>Email ID</Text>
					<Text style={styles.title}>{profile.email}</Text>
				</>
			)}

			{authToken ? (
				<View style={{ flex: 1, width: "100%" }}>
					<StyledBtn title="logout" onPress={handleLogout} />
				</View>
			) : (
				<View style={{ flexDirection: "row" }}>
					<View style={{ flex: 1, width: "100%" }}>
						<StyledBtn title="Login" type={"outlined"} onPress={handleLogin} />
					</View>
					<View style={{ flex: 1, width: "100%" }}>
						<StyledBtn title="Register" onPress={handleRegister} />
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

export default CookProfile;

const styles = StyleSheet.create({
	label: {
		fontSize: 14,
		color: colors.gray,
		fontWeight: "bold",
	},
	title: {
		fontSize: 18,
		color: colors.black,
		marginBottom: 20,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: colors.primary,
		resizeMode: "cover",
		marginBottom: 20,
	},
});
