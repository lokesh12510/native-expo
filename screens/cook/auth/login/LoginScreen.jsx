import React, { useEffect, useState } from "react";
import {
	InnerContainer,
	PageLogo,
	StyledContainer,
	SubTitle,
	ExtraView,
	ExtraText,
	GlobalStyles,
} from "../../../../theme/Styles";
import { StatusBar } from "expo-status-bar";
import { useFormik } from "formik";
import { ScrollView, Text, View, BackHandler } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "react-native-vector-icons";
import { useAuthCookLoginMutation } from "../../../../app/services/authApi";
import AppImages from "../../../../constants/Images";
import { Routes } from "../../../../constants/routes";
import theme from "../../../../theme/AppTheme";
import StyledTextField from "../../../../theme/uiSinppets/StyledTextField";
import { Button } from "react-native-paper";
import PrimaryBtn from "../../../../theme/uiSinppets/PrimaryBtn";
import { useLayoutEffect } from "react";
import { object, string } from "yup";
import { useSelector } from "react-redux";
import Snackbar from "../../../../components/Snackbar";

// Colors
const { primary, darkgray, black, green } = theme.colors;

const CookLogin = ({ navigation, route }) => {
	const { isLocated } = useSelector((state) => state.user);
	const [hidePass, setHidePass] = useState(true);

	// authLogin RTK Query
	const [authCookLogin, { data, isLoading, isError, error, isSuccess }] = useAuthCookLoginMutation();

	// Form validation with `formik`
	const formik = useFormik({
		initialValues: { email: "", password: "" },
		onSubmit: (values, { setSubmitting }) => {
			handleLocalLogin(values, setSubmitting);
		},
		validationSchema: object({
			email: string().email("Invalid Email!").required("Enter Email ID"),
			password: string().min(6, "Too Short!").required("Enter Password"),
		}),
	});

	const handleLocalLogin = (credential, setSubmitting) => {
		console.log("fetching...");
		authCookLogin({ ...credential, attempts: 1 });
		setSubmitting(false);
	};

	useEffect(() => {
		if (!isLoading && isSuccess) {
			navigation.navigate("Index");
			formik.resetForm();
		}
		// back handler
		const backAction = () => {
			{
				isLocated ? navigation.navigate(Routes.customer.profile) : navigation.navigate(Routes.customer.welcome);
			}
			return true;
		};
		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
		return () => backHandler.remove();
	}, [isSuccess]);

	const handleRoleChange = () => {
		navigation.navigate(Routes.auth.customerLogin);
	};
	// Hook used to render simultaneously when page loads to configure page header without flickering
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Cook Login",
			headerLeft: () =>
				isLocated ? (
					<MaterialIcons name="arrow-back" size={30} onPress={() => navigation.navigate(Routes.customer.home)} />
				) : (
					<MaterialIcons name="arrow-back" size={30} onPress={() => navigation.navigate(Routes.customer.welcome)} />
				),
		});
		formik.resetForm();
	}, []);

	return (
		<>
			<ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
				<StyledContainer>
					<StatusBar style="dark" />
					<InnerContainer>
						<PageLogo resizeMode="cover" source={AppImages.LogoDark} />
						<SubTitle>Login As</SubTitle>
						{isError && error?.data?.error && (
							<View style={[GlobalStyles.flexRowCenter, { padding: 10, backgroundColor: `${primary}15`, marginBottom: 10 }]}>
								<MaterialIcons name="error" size={25} color={primary} style={{ marginRight: 10 }} />
								<Text
									style={{
										color: primary,
									}}
								>
									Email or Password does't exist!
								</Text>
							</View>
						)}
						{/* {route.params?.isRegistration && !isError && !isLoading && (
						<View style={[GlobalStyles.flexRowCenter, { padding: 10, backgroundColor: `${green}15`, marginBottom: 10 }]}>
							<MaterialIcons name="check-circle" size={25} color={green} style={{ marginRight: 10 }} />
							<Text
								style={{
									color: green,
								}}
							>
								Registration successfully Completed!
							</Text>
						</View>
					)} */}
						<View
							style={{
								flexDirection: "row",
								width: "100%",
								justifyContent: "center",
							}}
						>
							<Button style={{ width: theme.SIZES.width / 2.5 }} mode="text" color={black} onPress={handleRoleChange}>
								Customer
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
								Cook
							</Button>
						</View>

						<View style={GlobalStyles.formContainer}>
							<StyledTextField
								label="Email"
								name="email"
								icon="mail-outline"
								placeholder="Enter Email Address"
								keyboardType="email-address"
								mode="outlined"
								onChangeText={formik.handleChange("email")}
								error={Boolean(formik.errors.email) && Boolean(formik.touched.email)}
								helperText={Boolean(formik.touched.email) && formik.errors.email}
								onBlur={formik.handleBlur("email")}
								value={formik.values.email}
							/>
							<StyledTextField
								label={"Password"}
								name="password"
								icon="lock-closed-outline"
								placeholder="* * * * * * * *"
								onChangeText={formik.handleChange("password")}
								onBlur={formik.handleBlur("password")}
								value={formik.values.password}
								isPassword={true}
								secureTextEntry={hidePass}
								error={Boolean(formik.errors.password) && Boolean(formik.touched.password)}
								helperText={Boolean(formik.touched.password) && formik.errors.password}
								setHidePass={setHidePass}
								mode="outlined"
								right={<TextInput.Icon name="eye" color={darkgray} onPress={() => setHidePass((hidePass) => !hidePass)} />}
							/>

							<PrimaryBtn
								isLoading={isLoading}
								mode="contained"
								onPress={formik.handleSubmit}
								title="Login"
								disabled={!formik.isValid}
							>
								Login
							</PrimaryBtn>

							<ExtraView>
								<ExtraText>Don't have an account already?</ExtraText>
								<Button mode="text" onPress={() => navigation.navigate(Routes.auth.cookRegister)}>
									Register
								</Button>
							</ExtraView>
							{/* <Button
						style={{
							display: "flex",
							alignItems: "center",
						}}
						color={"#000"}
						mode="text"
						onPress={() => console.log("forgot password")}
					>
						Forgot Password?
					</Button> */}
						</View>
					</InnerContainer>
				</StyledContainer>
			</ScrollView>
			<Snackbar />
		</>
	);
};

export default CookLogin;
