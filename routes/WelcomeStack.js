import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import SplashScreen from "../screens/splash/welcome/SplashScreen";

const WelcomeStack = createNativeStackNavigator();
const WelcomeStackScreen = () => (
  <WelcomeStack.Navigator>
    <WelcomeStack.Screen name="Splash" component={SplashScreen} />
  </WelcomeStack.Navigator>
);

export default WelcomeStackScreen;
