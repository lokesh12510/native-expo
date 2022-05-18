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
import { ActivityIndicator, ScrollView, Text, View, BackHandler } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "react-native-vector-icons";
import { useAuthCustomerRegisterMutation } from "../../../../app/services/authApi";
import AppImages from "../../../../constants/Images";
import { Routes } from "../../../../constants/routes";
import theme from "../../../../theme/AppTheme";
import StyledTextField from "../../../../theme/uiSinppets/StyledTextField";
import { Button } from "react-native-paper";
import { useLayoutEffect } from "react";
import { object, string } from "yup";
import PrimaryBtn from "../../../../theme/uiSinppets/PrimaryBtn";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../../../app/slices/snackbarSlice";
// Colors
const { primary, darkLight, darkgray, black } = theme.colors;

const CustomerRegister = ({ navigation, route }) => {
	const { isLocated } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [hidePass, setHidePass] = useState(true);
	// authLogin RTK Query
	const [authCustomerRegister, { data, isLoading, isError, error, isSuccess }] = useAuthCustomerRegisterMutation();

	const handleRoleChange = () => {
		navigation.navigate(Routes.auth.cookRegister);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Customer Registration",
			headerLeft: () =>
				isLocated ? (
					<MaterialIcons name="arrow-back" size={30} onPress={() => navigation.navigate(Routes.customer.home)} />
				) : (
					<MaterialIcons name="arrow-back" size={30} onPress={() => navigation.navigate(Routes.customer.welcome)} />
				),
		});
	}, []);

	// Form Validation using `formik`
	const formik = useFormik({
		initialValues: {
			name: "",
			contact_number: "",
			email: "",
			password: "",
		},
		onSubmit: (values, { setSubmitting }) => {
			handleCustomerRegistration(values, setSubmitting);
		},
		validationSchema: object({
			name: string().required("Enter Name"),
			contact_number: string().min(10, "Enter Valid Mobile Number!").required("Enter Mobile Number"),
			email: string().email("Invalid Email!").required("Enter Email ID"),
			password: string().min(6, "Too Short!").required("Enter Password"),
		}),
	});

	useEffect(() => {
		// Checking server validation and displaying errors
		if (!isLoading && isError) {
			error.data.error.map((item) => formik.setErrors({ [Object.keys(item)[0]]: item[Object.keys(item)[0]][0] }));
		}

		// if success navigate to login screen and reset form
		if (!isLoading && isSuccess) {
			formik.resetForm();
			navigation.navigate(Routes.auth.customerLogin);
			dispatch(showSnackbar({ title: "Registration Successfull!", type: "success" }));
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
	}, [isError, isSuccess]);

	// Customer Registration handler
	const handleCustomerRegistration = (credential, setSubmitting) => {
		authCustomerRegister(credential);
		setSubmitting(false);
	};

	return (
		<ScrollView>
			<StyledContainer>
				<StatusBar style="dark" />
				<InnerContainer>
					{isLoading && <ActivityIndicator size={"large"} color="primary" />}
					<PageLogo resizeMode="cover" source={AppImages.LogoDark} />
					<SubTitle>Register As</SubTitle>
					{isError && error?.data?.error && (
						<View style={[GlobalStyles.flexRowCenter, { padding: 10, backgroundColor: `${primary}15`, marginBottom: 10 }]}>
							<MaterialIcons name="error" size={25} color={primary} style={{ marginRight: 10 }} />
							<Text
								style={{
									color: primary,
								}}
							>
								Please verify form values!
							</Text>
						</View>
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
							style={{
								width: theme.SIZES.width / 2.5,
							}}
							mode="text"
							color={black}
							onPress={handleRoleChange}
						>
							Cook
						</Button>
					</View>

					<View style={GlobalStyles.formContainer}>
						<StyledTextField
							label="Name"
							name="name"
							icon="person"
							placeholder="Enter Name"
							mode="outlined"
							onChangeText={formik.handleChange("name")}
							onBlur={formik.handleBlur("name")}
							value={formik.values.name}
							error={Boolean(formik.errors.name) && Boolean(formik.touched.name)}
							helperText={Boolean(formik.touched.name) && formik.errors.name}
						/>
						<StyledTextField
							label="Mobile Number"
							name="contact_number"
							icon="contact"
							placeholder="Enter Mobile Number"
							keyboardType="numeric"
							mode="outlined"
							onChangeText={formik.handleChange("contact_number")}
							onBlur={formik.handleBlur("contact_number")}
							value={formik.values.contact_number}
							error={Boolean(formik.errors.contact_number) && Boolean(formik.touched.contact_number)}
							helperText={Boolean(formik.touched.contact_number) && formik.errors.contact_number}
						/>
						<StyledTextField
							label="Email"
							name="email"
							icon="mail-outline"
							placeholder="Enter Email Address"
							keyboardType="email-address"
							mode="outlined"
							onChangeText={formik.handleChange("email")}
							onBlur={formik.handleBlur("email")}
							value={formik.values.email}
							error={Boolean(formik.errors.email) && Boolean(formik.touched.email)}
							helperText={Boolean(formik.touched.email) && formik.errors.email}
						/>
						<StyledTextField
							label={"Password"}
							name="password"
							icon="lock-closed-outline"
							placeholder="* * * * * * * *"
							onChangeText={formik.handleChange("password")}
							onBlur={formik.handleBlur("password")}
							value={formik.values.password}
							error={Boolean(formik.errors.password) && Boolean(formik.touched.password)}
							helperText={Boolean(formik.touched.password) && formik.errors.password}
							isPassword={true}
							secureTextEntry={hidePass}
							setHidePass={setHidePass}
							mode="outlined"
							right={<TextInput.Icon name="eye" color={darkgray} onPress={() => setHidePass((hidePass) => !hidePass)} />}
						/>

						<PrimaryBtn
							isLoading={isLoading}
							mode="contained"
							onPress={formik.handleSubmit}
							title="Register"
							disabled={!formik.isValid}
						>
							Register
						</PrimaryBtn>

						<ExtraView>
							<ExtraText>Already have an account?</ExtraText>
							<Button mode="text" onPress={() => navigation.navigate(Routes.auth.customerLogin)}>
								Login
							</Button>
						</ExtraView>
					</View>
				</InnerContainer>
			</StyledContainer>
		</ScrollView>
	);
};

export default CustomerRegister;
