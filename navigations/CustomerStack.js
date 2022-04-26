import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/customer/home/Home";
import Profile from "../screens/customer/profile/Profile";
import Settings from "../screens/customer/settings/Settings";
import Orders from "../screens/customer/orders/Orders";
import Cart from "../screens/customer/cart/Cart";
import { Routes } from "../constants/routes";
import theme from "../theme/AppTheme";
import { AntDesign } from "react-native-vector-icons";

const { primary, darkgray } = theme.colors;

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

const customerTabs = createMaterialBottomTabNavigator();
export const CustomerTabsScreen = () => {
  return (
    <customerTabs.Navigator
      activeColor={primary}
      inactiveColor={darkgray}
      barStyle={{ backgroundColor: "#fff" }}
    >
      <customerTabs.Screen
        name={Routes.customer.home}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={20} color={color} />
          ),
        }}
      />

      <customerTabs.Screen
        name={Routes.customer.cart}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={20} color={color} />
          ),
        }}
      />
      <customerTabs.Screen
        name={Routes.customer.favorites}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" size={20} color={color} />
          ),
        }}
      />
      <customerTabs.Screen
        name={Routes.customer.profile}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={20} color={color} />
          ),
        }}
      />
    </customerTabs.Navigator>
  );
};
