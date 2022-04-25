import React, { useEffect, useState } from "react";

// * Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { CustomerDrawerScreen, CustomerTabsScreen } from "./CustomerStack";
import AuthStackScreen from "./AuthStack";
import WelcomeStackScreen from "./WelcomeStack";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { CookDrawerScreen } from "./CookStack";

const RootStack = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { authToken, role } = useSelector((state) => state.auth);

  console.log(authToken);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // setUser({});
    }, 1000);
  }, [authToken, role]);

  return isLoading ? (
    <Container>
      <ActivityIndicator size={"large"} color="#E70000" />
    </Container>
  ) : authToken && role === "ROLE_CUSTOMER" ? (
    <CustomerTabsScreen />
  ) : authToken && role === "ROLE_COOK" ? (
    <CookDrawerScreen />
  ) : (
    <AuthStackScreen />
  );
};

export default () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
