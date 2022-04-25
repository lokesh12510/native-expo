import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import theme from "../AppTheme";
import styled from "styled-components";

const StyledButton = ({ title, ...props }) => {
  return (
    <View>
      <Button
        {...props}
        style={{
          marginVertical: 20,
          justifyContent: "center",
        }}
      >
        {title}
      </Button>
    </View>
  );
};

export default StyledButton;
