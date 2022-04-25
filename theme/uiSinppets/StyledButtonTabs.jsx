import { View, Text } from "react-native";
import React from "react";
import Button from "react-native-paper";
import styled from "styled-components";

const StyledButtonTabs = () => {
  return (
    <Container>
      <Button mode="text">Customer Login</Button>
      <Button mode="text">Cook Login</Button>
    </Container>
  );
};

export default StyledButtonTabs;

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;
