import React, { useState } from "react";
import {
  InnerContainer,
  LeftIcon,
  PageLogo,
  PageTitle,
  StyledContainer,
  StyledFormArea,
  SubTitle,
  Colors,
  StyledInputLabel,
  StyledInput,
  RightIcon,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../../../../theme/Styles";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { ActivityIndicator, View } from "react-native";
import { useDispatch } from "react-redux";

// icons
import { Octicons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import KeyboardAvoidWrapper from "../../../../utils/KeyboardAvoidWrapper";
import appTheme from "../../../../theme/AppTheme";
import AppImages from "../../../../constants/Images";

// Colors
const { primary, darkLight } = appTheme.COLORS;

const CookLogin = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const dispatch = useDispatch();

  const handleLogin = (credential, setSubmitting) => {
    handleMsg(null);
    const url = `https://first-native-app.herokuapp.com/user/register`;

    axios
      .post(url, credential)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== "SUCCESS") {
          handleMsg(message, status);
        } else {
          navigation.navigate("Welcome", { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
        handleMsg("An error occurred!");
      });
  };

  const handleLocalLogin = (credential, setSubmitting) => {
    handleMsg(null);
    console.log(credential);
    // dispatch(login(credential));
    setSubmitting(false);
  };

  const handleMsg = (msg, type = "FAILED") => {
    setMessage(msg);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={AppImages.LogoDark} />

          <SubTitle>Cook Login</SubTitle>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "" || values.password == "") {
                handleMsg("Please fill all fields");
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
                <TextInput
                  label={"Email"}
                  icon="mail"
                  placeholder="Enter Email Address"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <TextInput
                  label={"Password"}
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePass}
                  isPassword={true}
                  hidePass={hidePass}
                  setHidePass={setHidePass}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size={"large"} color="primary" />
                  </StyledButton>
                )}
                <Line></Line>
                <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
                  <TextLink onPress={() => navigation.navigate("Register")}>
                    <TextLinkContent>Register</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidWrapper>
  );
};

const TextInput = ({
  label,
  icon,
  setHidePass,
  hidePass,
  isPassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={primary} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePass((hidePass) => !hidePass)}>
          <Ionicons
            name={hidePass ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default CookLogin;
