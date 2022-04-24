import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/customer/home/Home";
import Profile from "../screens/customer/profile/Profile";
import Settings from "../screens/customer/settings/Settings";
import Orders from "../screens/customer/orders/Orders";
import Cart from "../screens/customer/cart/Cart";
import { Routes } from "../constants/routes";
import appTheme from "../theme/AppTheme";

// Side Drawer Navigation
const customerDrawer = createDrawerNavigator();

export const CustomerDrawerScreen = () => (
  <customerDrawer.Navigator>
    <customerDrawer.Screen
      name="Tabs"
      component={CustomerTabsScreen}
      options={{ drawerLabel: "Home" }}
    />
    <customerDrawer.Screen name="Settings" component={Settings} />
    <customerDrawer.Screen name="Orders" component={Orders} />
    <customerDrawer.Screen name="Cart" component={Cart} />
  </customerDrawer.Navigator>
);

// Bottom Tabs Navigation

const customerTabs = createBottomTabNavigator();
export const CustomerTabsScreen = () => {
  return (
    <customerTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: appTheme.COLORS.primary,
      }}
    >
      <customerTabs.Screen
        name={Routes.customer.home}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />

      <customerTabs.Screen
        name={Routes.customer.cart}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={20} color={color} />
          ),
        }}
      />
      <customerTabs.Screen
        name={Routes.customer.favorites}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={20} color={color} />
          ),
        }}
      />
      <customerTabs.Screen
        name={Routes.customer.profile}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />
    </customerTabs.Navigator>
  );
};
