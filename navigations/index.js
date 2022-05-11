import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./AuthStack";
import { useSelector } from "react-redux";
import { CookDrawerScreen } from "./CookStack";
import { CustomerStackScreen } from "./CustomerStack";
import { ROLE } from "../constants";

const RootStack = () => {
	// Main navigation stack for user navigation and change screen stack based on user role change
	// Getting token and role from auth redux (AsyncStorage)
	const { authToken, role } = useSelector((state) => state.auth);
	// Getting isLocated boolean from user redux (AsyncStorage)
	const { isLocated } = useSelector((state) => state.user);
	// Re-rendering components on authToken or role or isLocated values changes
	useEffect(() => {}, [authToken, role, isLocated]);
	// Switching screens based on user roles, default as `CUSTOMER`
	switch (role) {
		case ROLE.CUSTOMER:
			return <CustomerStackScreen />;
		case ROLE.CHEF:
			return authToken ? <CookDrawerScreen /> : <AuthStackScreen />;
	}
};

export default () => (
	<NavigationContainer>
		<RootStack />
	</NavigationContainer>
);
