import styled from "styled-components";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import Constants from "expo-constants";
import appTheme from "./AppTheme";

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  background-color: #fff;
  height: ${appTheme.SIZES.height - 10}px;
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const PageLogo = styled.Image`
  width: 150px;
  height: 100px;
  margin-bottom: 30px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${appTheme.COLORS.primary};
  padding: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${appTheme.COLORS.tertiary};
`;

export const StyledFormArea = styled.View`
  width: ${appTheme.SIZES.width - 20}px;
  padding: 16px;
`;

export const StyledInput = styled.TextInput`
  background-color: ${appTheme.COLORS.secondary};
  padding: 15px;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 15px;
  color: ${appTheme.COLORS.tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${appTheme.COLORS.tertiary};
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

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${appTheme.COLORS.primary};
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 15px;
  align-items: center;
  height: 50px;
`;
export const ButtonText = styled.Text`
  color: ${appTheme.COLORS.white};
  font-size: 16px;
  text-transform: uppercase;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${(props) =>
    props.type == "SUCCESS" ? appTheme.COLORS.green : appTheme.COLORS.red};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${appTheme.COLORS.darkLight};
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
  color: ${appTheme.COLORS.tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${appTheme.COLORS.primary};
  font-size: 15px;
`;
