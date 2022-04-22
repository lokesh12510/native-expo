import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Root>
      <Text>Home</Text>
    </Root>
  );
};

export default Home;

const Root = styled.View`
  flex: 1;
  padding: 16px;
`;
