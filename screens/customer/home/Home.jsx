import { View, Text, Button } from "react-native";
import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../app/authSlice/authSlice";

const Home = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Root>
      <Text>Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </Root>
  );
};

export default Home;

const Root = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;
