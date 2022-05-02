import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { Routes } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { authReset } from "../../app/slices/authSlice";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../theme/AppTheme";
import StyledBtn from "../../theme/uiSinppets/StyledBtn";

const OnboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authReset());
  }, []);

  const handleLogin = () => {
    navigation.navigate(Routes.auth.customerLogin, {
      animate: "slide_from_right",
    });
  };
  const handleRegister = () => {
    navigation.navigate(Routes.auth.customerRegister, {
      animate: "slide_from_right",
    });
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Container>
        <Image
          source={{
            uri: "https://homecook.csuat.xyz/static/media/authBg.cbbba23627c8e2901cbb.webp",
          }}
          resizeMode="cover"
        >
          <Overlay
            colors={["#00000000", "#000000"]}
            style={{ height: "100%", width: "100%" }}
          >
            <Content>
              <HeroText>Taste our Home food right now!</HeroText>
              <StyledBtn title="Sign In" onPress={handleLogin} />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <SubText>Don't have an account ?</SubText>
                <Pressable onPress={handleRegister}>
                  <LinkText>Sign Up</LinkText>
                </Pressable>
              </View>
            </Content>
          </Overlay>
        </Image>
      </Container>
    </>
  );
};

export default OnboardScreen;

const Container = styled.View`
  flex: 1;
`;

const Overlay = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  justify-content: flex-end;
`;

const Image = styled.ImageBackground`
  position: relative;
`;

const Content = styled.View`
  padding: 50px 30px;
  z-index: 2;
`;

const HeroText = styled.Text`
  font-size: 35px;
  font-weight: bold;
  padding-bottom: 30px;
  color: #ffffff;
`;

const SubText = styled.Text`
  font-size: 16px;
  color: #fff;
  text-align: center;
`;

const LinkText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.primary};
  text-align: center;
  padding: 10px;
`;
