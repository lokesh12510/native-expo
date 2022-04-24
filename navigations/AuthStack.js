import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";
import CustomerLogin from "../screens/customer/auth/login/LoginScreen";
import CustomerRegister from "../screens/customer/auth/register/RegisterScreen";
import CookLogin from "../screens/cook/auth/login/LoginScreen";
import CookRegister from "../screens/cook/auth/register/RegisterScreen";
import { Routes } from "../constants/routes";

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    {/* Customer auth*/}
    <AuthStack.Screen
      name={Routes.auth.customerLogin}
      component={CustomerLogin}
    />
    <AuthStack.Screen
      name={Routes.auth.customerRegister}
      component={CustomerRegister}
    />
    {/* Cook auth*/}
    <AuthStack.Screen name={Routes.auth.cookLogin} component={CookLogin} />
    <AuthStack.Screen
      name={Routes.auth.cookRegister}
      component={CookRegister}
    />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
