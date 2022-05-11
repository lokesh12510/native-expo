import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authReset } from "../../../app/slices/authSlice";
import StyledBtn from "../../../theme/uiSinppets/StyledBtn";
import { clearCart } from "../../../app/slices/cartSlice";
import { resetUser } from "../../../app/slices/userSlice";
import { clearFood, closeKitchen, removeCategory } from "../../../app/slices/foodSlice";
import { Routes } from "../../../constants/routes";
import theme from "../../../theme/AppTheme";
import { GlobalStyles } from "../../../theme/Styles";
import { Divider } from "react-native-paper";
import AppImages from "../../../constants/Images";

const { colors } = theme;

const Profile = ({ navigation }) => {
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
		dispatch(clearCart());
		dispatch(authReset());
		dispatch(resetUser());
		dispatch(clearFood());
		dispatch(closeKitchen());
		dispatch(removeCategory());
	};
	return (
		<View style={[GlobalStyles.flexColumnCenter, GlobalStyles.container]}>
			<Text style={GlobalStyles.screenTitle}>Profile</Text>
			<Divider style={GlobalStyles.divider} />

			{authToken && (
				<>
					{profile.image ? (
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
		</View>
	);
};

export default Profile;

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
