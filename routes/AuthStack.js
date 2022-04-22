import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";
import CustomerLogin from "../screens/customer/auth/login/LoginScreen";
import CustomerRegister from "../screens/customer/auth/register/RegisterScreen";
import CookLogin from "../screens/cook/auth/login/LoginScreen";
import CookRegister from "../screens/cook/auth/register/RegisterScreen";

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    {/* Customer auth*/}
    <AuthStack.Screen name="CustomerLogin" component={CustomerLogin} />
    <AuthStack.Screen name="CustomerSignUp" component={CustomerRegister} />
    {/* Cook auth*/}
    <AuthStack.Screen name="CookLogin" component={CookLogin} />
    <AuthStack.Screen name="CookSignUp" component={CookRegister} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
