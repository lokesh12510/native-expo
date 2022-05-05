import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authReset } from "../../../app/slices/authSlice";
import StyledBtn from "../../../theme/uiSinppets/StyledBtn";
import styled from "styled-components";
import { clearCart } from "../../../app/slices/cartSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(authReset());
  };
  return (
    <Root>
      <Text>Profile</Text>
      <StyledBtn title="logout" onPress={handleLogout} />
    </Root>
  );
};

export default Profile;

const Root = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;
