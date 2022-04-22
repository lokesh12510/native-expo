import React, { useEffect, useState } from "react";

// * Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { AppDrawerScreen } from "./AppStack";
import AuthStackScreen from "./AuthStack";
import WelcomeStackScreen from "./WelcomeStack";

const RootStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
      setUser({});
    }, 500);
  }, []);
  return isLoading ? (
    <WelcomeStackScreen />
  ) : user ? (
    <AppDrawerScreen />
  ) : (
    <AuthStackScreen />
  );
};

export default () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);
