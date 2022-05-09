import { View, Text, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authReset } from "../../../app/slices/authSlice";
import StyledBtn from "../../../theme/uiSinppets/StyledBtn";
import styled from "styled-components";
import { clearCart } from "../../../app/slices/cartSlice";
import { resetUser } from "../../../app/slices/userSlice";
import { clearFood } from "../../../app/slices/foodSlice";
import { Routes } from "../../../constants/routes";
import theme from "../../../theme/AppTheme";

const { colors } = theme;

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();

  const { authToken } = useSelector((state) => state.auth);

  const handleLogin = () => {
    navigation.navigate(Routes.auth.customerLogin);
  };

  const handleRegister = () => {
    navigation.navigate(Routes.auth.customerRegister);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(authReset());
    dispatch(resetUser());
    dispatch(clearFood());
  };
  return (
    <Root>
      <Text>Profile</Text>
      {authToken ? (
        <StyledBtn title="logout" onPress={handleLogout} />
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={{
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 30,
              borderRadius: 5,
              margin: 1,
              borderColor: colors.primary,
              borderWidth: 0.5,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignContent: "center",
              elevation: 4,
            }}
            onPress={handleLogin}
            android_ripple={{ color: "#ccc" }}
          >
            <Text
              style={{
                color: colors.primary,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 30,
              borderRadius: 5,
              margin: 1,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignContent: "center",
              elevation: 4,
            }}
            onPress={handleRegister}
            android_ripple={{ color: "#ccc" }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
              Register
            </Text>
          </Pressable>
        </View>
      )}
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
