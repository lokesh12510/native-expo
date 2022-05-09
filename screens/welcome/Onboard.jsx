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
import { resetUser } from "../../app/slices/userSlice";

const OnboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authReset());
    dispatch(resetUser());
  }, []);

  const handleContinue = () => {
    navigation.navigate(Routes.customer.location, {
      animate: "slide_from_right",
    });
  };
  // const handleRegister = () => {
  //   navigation.navigate(Routes.auth.customerRegister, {
  //     animate: "slide_from_right",
  //   });
  // };
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
              <View style={{ marginBottom: 60 }}>
                <SubText>Taste our </SubText>
                <HeroText>Home food</HeroText>
                <SubText>right now!</SubText>
              </View>
              <StyledBtn title="Continue" onPress={handleContinue} />
              {/* <View
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
              </View> */}
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
  padding: 50px 16px;
  z-index: 2;
`;

const HeroText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: ${theme.colors.secondary};
`;

const SubText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #fff;
`;

const LinkText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.primary};
  text-align: center;
  padding: 10px;
`;
