import React, { useState } from "react";
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
import { ActivityIndicator, ScrollView, View } from "react-native";
import { TextInput } from "react-native-paper";

import { useAuthLoginMutation, authCookRegister } from "../../../../app/services/authApi";
import AppImages from "../../../../constants/Images";
import { Routes } from "../../../../constants/routes";
import theme from "../../../../theme/AppTheme";
import StyledTextField from "../../../../theme/uiSinppets/StyledTextField";
import { Button } from "react-native-paper";
import PrimaryBtn from "../../../../theme/uiSinppets/PrimaryBtn";
import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { loading } from "../../../../app/slices/authSlice";
// Colors
const { primary, darkLight, darkgray, black } = theme.colors;

const CookRegister = ({ navigation, route }) => {
	const [hidePass, setHidePass] = useState(true);
	const dispatch = useDispatch();

	// authLogin RTK Query
	const [authCookRegister, { data, isLoading, isError, error, isSuccess }] = authCookRegister();

	if (!isLoading && isSuccess) {
		navigation.navigate(Routes.auth.customerLogin);
	}

	const handleLocalLogin = (credential, setSubmitting) => {
		dispatch(loading());
		authCookRegister(credential);
		setSubmitting(false);
	};

	const handleRoleChange = () => {
		navigation.navigate(Routes.auth.customerRegister, {
			animate: "slide_from_left",
		});
	};
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Cook Registration",
			animation: route.params?.animate,
		});
	}, []);

	return (
		<ScrollView>
			<StyledContainer>
				<StatusBar style="dark" />
				<InnerContainer>
					{isLoading && <ActivityIndicator size={"large"} color="primary" />}
					<PageLogo resizeMode="cover" source={AppImages.LogoDark} />
					<SubTitle>Register As</SubTitle>
					<View
						style={{
							flexDirection: "row",
							width: "100%",
							justifyContent: "center",
						}}
					>
						<Button style={{ width: theme.SIZES.width / 2.5 }} mode="text" color={black} onPress={handleRoleChange}>
							customer
						</Button>
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
							cook
						</Button>
					</View>

					<Formik
						initialValues={{ name: "", phone: "", email: "", password: "" }}
						onSubmit={(values, { setSubmitting }) => {
							if (values.email == "" || values.password == "" || values.name == "" || values.phone == "") {
								setSubmitting(false);
							} else {
								handleLocalLogin(values, setSubmitting);
							}
						}}
					>
						{({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
							<StyledFormArea>
								<StyledTextField
									label="Name"
									icon="person"
									placeholder="Enter Name"
									mode="outlined"
									onChangeText={handleChange("name")}
									onBlur={handleBlur("name")}
									value={values.name}
								/>
								<StyledTextField
									label="Mobile Number"
									icon="contact"
									placeholder="Enter Mobile Number"
									keyboardType="keypad"
									mode="outlined"
									onChangeText={handleChange("phone")}
									onBlur={handleBlur("phone")}
									value={values.phone}
								/>
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
									right={<TextInput.Icon name="eye" color={darkgray} onPress={() => setHidePass((hidePass) => !hidePass)} />}
								/>

								<PrimaryBtn isLoading={isSubmitting} mode="contained" onPress={handleSubmit} title="Register">
									Register
								</PrimaryBtn>

								<ExtraView>
									<ExtraText>Already have an account?</ExtraText>
									<Button
										mode="text"
										onPress={() =>
											navigation.navigate(Routes.auth.cookLogin, {
												animate: "pop",
											})
										}
									>
										Login
									</Button>
								</ExtraView>
							</StyledFormArea>
						)}
					</Formik>
				</InnerContainer>
			</StyledContainer>
		</ScrollView>
	);
};

export default CookRegister;
