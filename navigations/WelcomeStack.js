import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import OnboardScreen from "../screens/welcome/Onboard";

const WelcomeStack = createNativeStackNavigator();
const WelcomeStackScreen = () => (
  <WelcomeStack.Navigator
    screenOption={{ headerShown: "none" }}
    initialRouteName="Welcome"
  >
    <WelcomeStack.Screen name="Welcome" component={OnboardScreen} />
  </WelcomeStack.Navigator>
);

export default WelcomeStackScreen;
