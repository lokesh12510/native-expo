import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import OnboardScreen from "../screens/welcome/Onboard";
import UserRoleScreen from "../screens/welcome/UserRole";

const WelcomeStack = createNativeStackNavigator();
const WelcomeStackScreen = () => (
  <WelcomeStack.Navigator screenOption={{ headerShown: "none" }}>
    <WelcomeStack.Screen name="Welcome" component={OnboardScreen} />
    <WelcomeStack.Screen name="UserRole" component={UserRoleScreen} />
  </WelcomeStack.Navigator>
);

export default WelcomeStackScreen;
