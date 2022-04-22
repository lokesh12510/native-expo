import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/customer/home/Home";
import Profile from "../screens/customer/profile/Profile";
import Settings from "../screens/customer/settings/Settings";
import CustomerRegister from "../screens/customer/auth/register/RegisterScreen";
import CustomerLogin from "../screens/customer/auth/login/LoginScreen";

// Side Drawer Navigation
const AppDrawer = createDrawerNavigator();

export const AppDrawerScreen = () => (
  <AppDrawer.Navigator>
    <AppDrawer.Screen
      name="Tabs"
      component={AppTabsScreen}
      options={{ drawerLabel: "Home" }}
    />
    <AppDrawer.Screen name="Settings" component={Settings} />
    <AppDrawer.Screen name="Dashboard" component={CustomerRegister} />
  </AppDrawer.Navigator>
);

// Bottom Tabs Navigation

const AppTabs = createBottomTabNavigator();
export const AppTabsScreen = () => {
  return (
    <AppTabs.Navigator screenOptions={{ headerShown: false }}>
      <AppTabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <AppTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </AppTabs.Navigator>
  );
};
