import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Home from "../screens/customer/home/Home";
import Profile from "../screens/customer/profile/Profile";
import Orders from "../screens/customer/orders/Orders";
import Cart from "../screens/customer/cart/Cart";
import { Routes } from "../constants/routes";
import theme, { colors } from "../theme/AppTheme";
import { AntDesign, FontAwesome5 } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import LocationSelect from "../components/LocationSelect";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import { authReset } from "../app/slices/authSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfirmOrder from "../screens/customer/confirmOrder/ConfirmOrder";
import SuccessScreen from "../screens/customer/confirmOrder/SuccessScreen";
import { clearCart } from "../app/slices/cartSlice";
import { resetUser } from "../app/slices/userSlice";
import LocationScreen from "../screens/customer/location/LocationScreen";
import { clearFood, closeKitchen, removeCategory } from "../app/slices/foodSlice";
import StyledBtn from "../theme/uiSinppets/StyledBtn";
import CustomerLogin from "../screens/customer/auth/login/LoginScreen";
import CustomerRegister from "../screens/customer/auth/register/RegisterScreen";
import CookLogin from "../screens/cook/auth/login/LoginScreen";
import CookRegister from "../screens/cook/auth/register/RegisterScreen";
import AppImages from "../constants/Images";
import OnboardScreen from "../screens/welcome/Onboard";

const { primary, darkgray } = theme.colors;

// Side Drawer Navigation
const customerDrawer = createDrawerNavigator();
// Custom Side drawer items component
const CustomDrawerContent = (props) => {
	// select Auth]
	const { authToken } = useSelector((state) => state.auth);
	const { profile } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	// customer login handler
	const handleLogin = () => {
		props.navigation.navigate(Routes.auth.customerLogin);
	};
	// customer register handler
	const handleRegister = () => {
		props.navigation.navigate(Routes.auth.customerRegister);
	};
	// customer logout handler
	const handleLogout = () => {
		dispatch(clearCart());
		dispatch(authReset());
		dispatch(resetUser());
		dispatch(clearFood());
		dispatch(closeKitchen());
		dispatch(removeCategory());
	};
	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.sidebarWrapper}>
				<View style={styles.profileImageWrapper}>
					{profile.image ? (
						<Image
							style={styles.profileImage}
							source={{
								uri: profile.image,
							}}
						/>
					) : (
						<Image style={styles.profileImage} source={AppImages.Avatar} />
					)}
				</View>
				<View>
					<Text style={styles.profileTitle}>{(profile.name && profile.name) || "Guest"}</Text>
					<Text style={styles.profileSubTitle}>Customer</Text>
				</View>
			</View>
			<Divider
				style={{
					marginBottom: 20,
				}}
			/>

			<DrawerItemList {...props} />
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "flex-end",
					flexDirection: "row",
					marginHorizontal: 16,
					marginTop: 50,
				}}
			>
				{authToken ? (
					<View
						style={{
							flexDirection: "column",
							flex: 1,
						}}
					>
						<StyledBtn title="Logout" onPress={handleLogout} />
					</View>
				) : (
					<View
						style={{
							flexDirection: "column",
							flex: 1,
						}}
					>
						<StyledBtn title="Login" type={"outlined"} onPress={handleLogin} />
						<StyledBtn title="Register" onPress={handleRegister} />
					</View>
				)}
			</View>
		</DrawerContentScrollView>
	);
};

export const CustomerDrawerScreen = () => {
	const navigation = useNavigation();
	// select Auth]
	const { profile } = useSelector((state) => state.user);
	return (
		<>
			<customerDrawer.Navigator
				screenOptions={{
					drawerActiveTintColor: primary,
				}}
				drawerContent={(props) => <CustomDrawerContent {...props} />}
			>
				<customerDrawer.Screen
					name={Routes.customer.home}
					component={Home}
					options={{
						drawerLabel: Routes.customer.home,
						headerRightContainerStyle: {
							marginRight: 16,
						},

						headerTitle: () => {
							return <LocationSelect />;
						},
						headerRight: ({ color }) => {
							return (
								<Pressable style={styles.profileIconWrapper} onPress={() => navigation.navigate(Routes.customer.profile)}>
									{profile.image ? (
										<Image
											source={{
												uri: profile.image,
											}}
											style={styles.profileImage}
										/>
									) : (
										<Image source={AppImages.Avatar} style={styles.profileImage} />
									)}
								</Pressable>
							);
						},
					}}
				/>
				<customerDrawer.Screen name={Routes.customer.cart} component={Cart} />
				<customerDrawer.Screen
					options={{
						drawerLabel: "My Orders",
					}}
					name={Routes.customer.myOrders}
					component={Orders}
				/>
			</customerDrawer.Navigator>
		</>
	);
};

// customer Stack

const CustomerStack = createNativeStackNavigator();

export const CustomerStackScreen = () => {
	const { isLocated } = useSelector((state) => state.user);
	// select Auth]
	const { authToken } = useSelector((state) => state.auth);

	return (
		<CustomerStack.Navigator>
			{isLocated ? (
				<>
					{/* Common screens for guest users */}
					<CustomerStack.Group>
						<CustomerStack.Screen
							name={"Index"}
							component={CustomerDrawerScreen}
							options={{
								headerShown: false,
							}}
						/>
						<CustomerStack.Screen name={Routes.customer.profile} component={Profile} />

						<CustomerStack.Screen
							name={Routes.customer.changeLocation}
							options={{
								headerTitle: "Change Location",
							}}
							component={LocationScreen}
						/>
					</CustomerStack.Group>
					{/* Common screens for guest users */}

					{/* Screens for Authenticated Customers */}
					{authToken && (
						<CustomerStack.Group>
							<CustomerStack.Screen
								options={{
									headerTitle: "Confirm Order",
								}}
								name={Routes.customer.confirm}
								component={ConfirmOrder}
							/>
							<CustomerStack.Screen
								options={{
									headerShown: false,
								}}
								name={Routes.customer.success}
								component={SuccessScreen}
							/>
						</CustomerStack.Group>
					)}
					{/* Screens for Authenticated Customers */}

					{/* Auth Screens for Customers */}
					<CustomerStack.Group>
						{/* Customer auth*/}
						<CustomerStack.Screen name={Routes.auth.customerLogin} component={CustomerLogin} />
						<CustomerStack.Screen name={Routes.auth.customerRegister} component={CustomerRegister} />
						{/* Cook auth*/}
						<CustomerStack.Screen name={Routes.auth.cookLogin} component={CookLogin} />
						<CustomerStack.Screen name={Routes.auth.cookRegister} component={CookRegister} />
					</CustomerStack.Group>
					{/* Auth Screens for Customers */}
				</>
			) : (
				// Starter Screens for Guest users when user location is not added
				<CustomerStack.Group>
					<CustomerStack.Screen
						name="Welcome"
						component={OnboardScreen}
						options={{
							headerShown: false,
						}}
					/>
					<CustomerStack.Screen
						name={Routes.customer.location}
						options={{
							headerTitle: "Select Location",
							headerShown: false,
						}}
						component={LocationScreen}
					/>
				</CustomerStack.Group>
			)}
		</CustomerStack.Navigator>
	);
};

const styles = StyleSheet.create({
	profileIconWrapper: {
		width: 35,
		height: 35,
		borderRadius: 50,
		overflow: "hidden",
		marginRight: 16,
	},
	profileImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	sidebarWrapper: {
		color: "#fff",
		padding: 8,
		marginBottom: 10,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	profileImageWrapper: {
		width: 50,
		height: 50,
		borderRadius: 50,
		overflow: "hidden",
		marginRight: 16,
	},
	profileTitle: {
		fontSize: 16,
		marginBottom: 4,
		textTransform: "uppercase",
	},
	profileSubTitle: {
		fontSize: 14,
		marginBottom: 4,
		color: darkgray,
	},
});
