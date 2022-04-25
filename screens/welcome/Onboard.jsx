import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { Routes } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { roleSwitch } from "../../app/authSlice/authSlice";
import AppImages from "../../constants/Images";
import { PageLogo } from "../../theme/Styles";
import StyledButton from "../../theme/uiSinppets/StyledButton";

const OnboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(roleSwitch({ role: "ROLE_GUEST" }));
  }, []);

  const handleContinue = () => {
    navigation.navigate(Routes.auth.customerLogin, {
      animate: "slide_from_right",
    });
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://homecook.csuat.xyz/static/media/authBg.cbbba23627c8e2901cbb.webp",
          }}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.content}>
            <StyledButton
              title="Continue"
              mode="contained"
              onPress={handleContinue}
            >
              Continue
            </StyledButton>
          </View>
          <View style={styles.overlay}></View>
        </ImageBackground>
      </View>
    </>
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#00000070",
    zIndex: 1,
  },
  content: {
    padding: 20,
    zIndex: 2,
  },
});
