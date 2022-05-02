import React, { useLayoutEffect, useState } from "react";
import {
  InnerContainer,
  PageLogo,
  StyledContainer,
  StyledFormArea,
  SubTitle,
  ExtraView,
  ExtraText,
} from "../../../../theme/Styles";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

import { useAuthCustomerLoginMutation } from "../../../../app/services/authApi";
import AppImages from "../../../../constants/Images";
import { Routes } from "../../../../constants/routes";
import theme from "../../../../theme/AppTheme";
import StyledTextField from "../../../../theme/uiSinppets/StyledTextField";
import { Button } from "react-native-paper";
import StyledButton from "../../../../theme/uiSinppets/StyledButton";
import { useDispatch } from "react-redux";
import { loading } from "../../../../app/slices/authSlice";
// Colors
const { primary, darkLight, darkgray, black } = theme.colors;

const CustomerLogin = ({ navigation, route }) => {
  const [hidePass, setHidePass] = useState(true);
  const dispatch = useDispatch();

  // authLogin RTK Query
  const [authCustomerLogin, { data, isLoading, isError, error, isSuccess }] =
    useAuthCustomerLoginMutation();

  const handleLocalLogin = (credential, setSubmitting) => {
    dispatch(loading());
    authCustomerLogin({ ...credential, attempts: 1 });

    console.log(data, "Query");
    setSubmitting(false);
  };

  const handleRoleChange = () => {
    navigation.navigate(Routes.auth.cookLogin, { animate: "slide_from_right" });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      animation: route.params?.animate,
      title: "Customer Login",
    });
  }, []);

  return (
    <ScrollView>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={AppImages.LogoDark} />
          <SubTitle>Login As</SubTitle>
          {isError && error?.data?.error && (
            <Text
              style={{
                color: primary,
                padding: 10,
                backgroundColor: `${primary}15`,
                marginBottom: 10,
              }}
            >
              Username or Password does't Exist!
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              mode="outlined"
              onPress={() => console.log("Pressed")}
              style={{
                borderBottomColor: theme.colors.primary,
                borderWidth: 0,
                borderBottomWidth: 3,
                alignItems: "center",
                justifyContent: "center",
                width: theme.SIZES.width / 2.5,
              }}
            >
              Customer
            </Button>
            <Button
              style={{ width: theme.SIZES.width / 2.5 }}
              mode="text"
              color={black}
              onPress={handleRoleChange}
            >
              Cook
            </Button>
          </View>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "" || values.password == "") {
                setSubmitting(false);
              } else {
                handleLocalLogin(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <StyledTextField
                  label="Email"
                  icon="mail-outline"
                  placeholder="Enter Email Address"
                  keyboardType="email-address"
                  mode="outlined"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <StyledTextField
                  label={"Password"}
                  icon="lock-closed-outline"
                  placeholder="* * * * * * * *"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  isPassword={true}
                  secureTextEntry={hidePass}
                  setHidePass={setHidePass}
                  mode="outlined"
                  right={
                    <TextInput.Icon
                      name="eye"
                      color={darkgray}
                      onPress={() => setHidePass((hidePass) => !hidePass)}
                    />
                  }
                />

                <StyledButton
                  isLoading={isSubmitting}
                  mode="contained"
                  onPress={handleSubmit}
                  title="Login"
                >
                  Login
                </StyledButton>

                <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
                  <Button
                    mode="text"
                    onPress={() =>
                      navigation.navigate(Routes.auth.customerRegister, {
                        animate: "pop",
                      })
                    }
                  >
                    Register
                  </Button>
                </ExtraView>
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  color={"#000"}
                  mode="text"
                  onPress={() => navigation.navigate("Welcome")}
                >
                  Forgot Password?
                </Button>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </ScrollView>
  );
};

export default CustomerLogin;
