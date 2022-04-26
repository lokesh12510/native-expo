import React, { useEffect, useState } from "react";

// * Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { CustomerDrawerScreen, CustomerTabsScreen } from "./CustomerStack";
import AuthStackScreen from "./AuthStack";
import WelcomeStackScreen from "./WelcomeStack";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CookDrawerScreen } from "./CookStack";
import theme from "../theme/AppTheme";

const RootStack = () => {
  const {
    authToken,
    role,
    loading: isLoading,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(authToken);

  useEffect(() => {}, [authToken, role]);

  return isLoading ? (
    <Container>
      <ActivityIndicator size={"large"} color={theme.colors.primary} />
    </Container>
  ) : authToken && role === "ROLE_CUSTOMER" ? (
    <CustomerTabsScreen />
  ) : authToken && role === "ROLE_CHEF" ? (
    <CookDrawerScreen />
  ) : (
    !isLoading && <AuthStackScreen />
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