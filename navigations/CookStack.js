import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/customer/home/Home";
import Profile from "../screens/customer/profile/Profile";
import Settings from "../screens/customer/settings/Settings";
import { Routes } from "../constants/routes";

// Side Drawer Navigation
const cookDrawer = createDrawerNavigator();

export const CookDrawerScreen = () => (
	<cookDrawer.Navigator>
		<cookDrawer.Screen name="Tabs" component={CookTabsScreen} options={{ drawerLabel: "Home" }} />
		<cookDrawer.Screen name={Routes.cook.settings} component={Settings} />
	</cookDrawer.Navigator>
);

// Bottom Tabs Navigation

const cookTabs = createBottomTabNavigator();
export const CookTabsScreen = () => {
	return (
		<cookTabs.Navigator screenOptions={{ headerShown: false }}>
			<cookTabs.Screen
				name={Routes.cook.dashboard}
				component={Home}
				options={{
					tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
				}}
			/>
			<cookTabs.Screen
				name={Routes.cook.food}
				component={Home}
				options={{
					tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
				}}
			/>
			<cookTabs.Screen
				name={Routes.cook.orders}
				component={Home}
				options={{
					tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
				}}
			/>
			<cookTabs.Screen
				name={Routes.cook.profile}
				component={Profile}
				options={{
					tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
				}}
			/>
		</cookTabs.Navigator>
	);
};
