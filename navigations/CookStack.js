import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Home from "../screens/customer/home/Home";
import Profile from "../screens/customer/profile/Profile";
import Settings from "../screens/customer/settings/Settings";
import { Routes } from "../constants/routes";
import Dashboard from "../screens/cook/dashboard/DashboardScreen";
import Food from "../screens/cook/food/Food";
import Orders from "../screens/cook/orders/Orders";
import CookProfile from "../screens/cook/profile/Profile";
import theme from "../theme/AppTheme";
import { useSelector } from "react-redux";
import CustomerLogin from "../screens/customer/auth/login/LoginScreen";
import CustomerRegister from "../screens/customer/auth/register/RegisterScreen";
import CookLogin from "../screens/cook/auth/login/LoginScreen";
import CookRegister from "../screens/cook/auth/register/RegisterScreen";

const { colors } = theme;

// Cook stack screens
const CookStack = createNativeStackNavigator();

export const CookStackScreen = () => {
	// select Auth]
	const { authToken } = useSelector((state) => state.auth);
	return (
		<CookStack.Navigator>
			{/* Screens for Authenticated Cooks */}
			{authToken ? (
				<CookStack.Group>
					<CookStack.Screen name="Index" component={CookTabsScreen} options={{ headerShown: false }} />
					<CookStack.Screen name={Routes.cook.settings} component={Settings} />
				</CookStack.Group>
			) : (
				<CookStack.Group>
					{/* Customer auth*/}
					<CookStack.Screen name={Routes.auth.customerLogin} component={CustomerLogin} />
					<CookStack.Screen name={Routes.auth.customerRegister} component={CustomerRegister} />
					{/* Cook auth*/}
					<CookStack.Screen name={Routes.auth.cookLogin} component={CookLogin} />
					<CookStack.Screen name={Routes.auth.cookRegister} component={CookRegister} />
				</CookStack.Group>
			)}
		</CookStack.Navigator>
	);
};

// Bottom Tabs Navigation

const cookTabs = createBottomTabNavigator();
export const CookTabsScreen = () => {
	return (
		<cookTabs.Navigator
			screenOptions={{
				tabBarActiveTintColor: colors.black,
				tabBarInactiveTintColor: colors.lightGray,
				tabBarAllowFontScaling: true,
				tabBarStyle: {
					backgroundColor: colors.secondary,
					paddingVertical: 5,
					paddingBottom: 10,
					elevation: 5,
					shadowOffset: { width: 5, height: 10 },
					shadowRadius: 1,
					height: 60,
				},
			}}
		>
			<cookTabs.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					tabBarIcon: ({ color, size }) => <Ionicons name="home" size={20} color={color} />,
				}}
			/>
			<cookTabs.Screen
				name={Routes.cook.food}
				component={Food}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialIcons name="restaurant-menu" size={20} color={color} />,
				}}
			/>
			<cookTabs.Screen
				name={Routes.cook.orders}
				component={Orders}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialIcons name="dashboard" size={20} color={color} />,
				}}
			/>
			<cookTabs.Screen
				name={Routes.cook.profile}
				component={CookProfile}
				options={{
					tabBarIcon: ({ color, size }) => <FontAwesome name="user-circle-o" size={20} color={color} />,
				}}
			/>
		</cookTabs.Navigator>
	);
};
