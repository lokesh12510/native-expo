import React, { useEffect, useState } from "react";

// * Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./AuthStack";
import { ActivityIndicator, Button } from "react-native";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CookDrawerScreen } from "./CookStack";
import theme from "../theme/AppTheme";
import { authReset } from "../app/slices/authSlice";
import { CustomerStackScreen } from "./CustomerStack";

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
      <Button onPress={dispatch(authReset())} />
      <ActivityIndicator size={"large"} color={theme.colors.primary} />
    </Container>
  ) : authToken && role === "ROLE_CUSTOMER" ? (
    <>
      <CustomerStackScreen />
    </>
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
