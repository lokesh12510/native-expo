import React, { useEffect, useState } from "react";

// * Navigation imports
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppDrawerScreen, AppStackScreen } from "./AppStack";
import AuthStackScreen from "./AuthStack";
import WelcomeStackScreen from "./WelcomeStack";

// * Icons
import { Ionicons } from "@expo/vector-icons";

// ** --------Screens-------- **//
import Settings from "../screens/customer/settings/Settings";
import Dashboard from "../screens/cook/dashboard/DashboardScreen";
import Home from "../screens/customer/home/Home";
import CustomerLogin from "../screens/customer/auth/login/LoginScreen";
import Profile from "../screens/customer/profile/Profile";

const RootStackNavigator = createNativeStackNavigator(
  {
    initialRouteName: "Home",
  },
  {
    Home: {
      screen: Home,
    },
    Login: {
      screen: CustomerLogin,
      headerMode: "none",
    },
    Profile: {
      screen: Profile,
    },
  }
);

export default createAppContainer(RootStackNavigator);
