import styled from "styled-components";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import theme from "./AppTheme";
import { TextInput, Button } from "react-native-paper";

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  background-color: ${theme.colors.white};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const PageLogo = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${theme.colors.primary};
  padding: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${theme.colors.tertiary};
`;

export const StyledFormArea = styled.View`
  width: ${theme.SIZES.width - 20}px;
  padding: 16px;
`;

export const StyledInput = styled.TextInput`
  background-color: ${theme.colors.secondary};
  padding: 15px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 15px;
  color: ${theme.colors.tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${theme.colors.tertiary};
  font-size: 14px;
  text-align: left;
`;
export const LeftIcon = styled.View`
  left: 15px;
  top: 43px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: 16px;
  text-transform: uppercase;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${(props) =>
    props.type == "SUCCESS" ? theme.colors.green : theme.colors.red};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${theme.colors.darkLight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${theme.colors.tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${theme.colors.primary};
  font-size: 15px;
`;
