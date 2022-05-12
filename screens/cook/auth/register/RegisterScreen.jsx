import React, { useEffect, useState } from "react";
import {
	InnerContainer,
	PageLogo,
	StyledContainer,
	StyledFormArea,
	SubTitle,
	ExtraView,
	ExtraText,
	GlobalStyles,
} from "../../../../theme/Styles";
import { StatusBar } from "expo-status-bar";
import { useFormik } from "formik";
import { ActivityIndicator, ScrollView, StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialIcons, AntDesign } from "react-native-vector-icons";
import { useAuthCookRegisterMutation } from "../../../../app/services/authApi";
import AppImages from "../../../../constants/Images";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Routes } from "../../../../constants/routes";
import theme, { colors } from "../../../../theme/AppTheme";
import StyledTextField from "../../../../theme/uiSinppets/StyledTextField";
import { Button } from "react-native-paper";
import { useLayoutEffect } from "react";
import { object, string } from "yup";
import PrimaryBtn from "../../../../theme/uiSinppets/PrimaryBtn";
import AutocompletePlaces from "../../../../components/AutocompletePlaces";

import SelectField from "../../../../components/SelectField";

// Colors
const { primary, darkLight, darkgray, black } = theme.colors;

const CookRegister = ({ navigation, route }) => {
	const [hidePass, setHidePass] = useState(true);
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);

	const [address, setAddress] = useState("");
	const [coords, setCoords] = useState({});

	const handleAddress = (text) => {
		setAddress(text);
	};

	const handleCoords = (lat, long) => {
		setCoords({ latitude: lat, longitude: long });
	};

	// authLogin RTK Query
	const [authCookRegister, { data, isLoading, isError, error, isSuccess }] = useAuthCookRegisterMutation();

	if (!isLoading && isSuccess) {
		navigation.navigate(Routes.auth.customerLogin);
	}

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

	// Form Validation using `formik`
	const formik = useFormik({
		initialValues: {
			name: "",
			kitchen_name: "",
			mobile: "",
			email: "",
			password: "",
			radius: "",
			city: "",
		},
		onSubmit: (values, { setSubmitting }) => {
			console.log("form");
			handleCookRegistration(values, setSubmitting);
		},
		validationSchema: object({
			name: string().required("Enter Name"),
			kitchen_name: string().required("Enter Kitchen Name"),
			mobile: string().min(10, "Enter Valid Mobile Number!").required("Enter Mobile Number"),
			email: string().email("Invalid Email!").required("Enter Email ID"),
			password: string().min(6, "Too Short!").required("Enter Password"),
			radius: string().required("Select your delivery radius"),
			city: string().required("Enter City Name"),
		}),
	});

	// Cook Registration handler
	const handleCookRegistration = (credential, setSubmitting) => {
		let formData = new FormData();

		formData.append("name", credential.name);
		formData.append("kitchen_name", credential.kitchen_name);
		formData.append("mobile", credential.mobile);
		formData.append("email", credential.email);
		formData.append("password", credential.password);
		formData.append("radius_in_km", credential.radius);
		formData.append("city", credential.city);
		formData.append("address", JSON.stringify(address));
		formData.append("description", "");
		formData.append("profile", "");
		formData.append("profile_file", "");
		formData.append("latitude", JSON.stringify(coords.latitude));
		formData.append("longitude", JSON.stringify(coords.longitude));

		authCookRegister(formData);
		setSubmitting(false);
	};

	useEffect(() => {
		// Checking server validation and displaying errors
		if (!isLoading && isError) {
			error.data.error.map((item) => formik.setErrors({ [Object.keys(item)[0]]: item[Object.keys(item)[0]][0] }));
		}

		// if success navigate to login screen and reset form
		if (!isLoading && isSuccess) {
			formik.resetForm();
			navigation.navigate(Routes.auth.cookLogin, {
				isRegistration: true,
			});
		}
	}, [isError, isSuccess]);

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
							style={{
								width: theme.SIZES.width / 2.5,
							}}
							mode="text"
							color={black}
							onPress={handleRoleChange}
						>
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
							label="Kitchen Name"
							name="kitchen_name"
							icon="person"
							placeholder="Enter Kitchen Name"
							mode="outlined"
							onChangeText={formik.handleChange("kitchen_name")}
							onBlur={formik.handleBlur("kitchen_name")}
							value={formik.values.kitchen_name}
							error={Boolean(formik.errors.kitchen_name) && Boolean(formik.touched.kitchen_name)}
							helperText={Boolean(formik.touched.kitchen_name) && formik.errors.kitchen_name}
						/>
						<StyledTextField
							label="Mobile Number"
							name="mobile"
							icon="contact"
							placeholder="Enter Mobile Number"
							keyboardType="numeric"
							mode="outlined"
							onChangeText={formik.handleChange("mobile")}
							onBlur={formik.handleBlur("mobile")}
							value={formik.values.mobile}
							error={Boolean(formik.errors.mobile) && Boolean(formik.touched.mobile)}
							helperText={Boolean(formik.touched.mobile) && formik.errors.mobile}
						/>
						<StyledTextField
							label="City"
							name="city"
							icon="contact"
							placeholder="Enter City Name"
							mode="outlined"
							onChangeText={formik.handleChange("city")}
							onBlur={formik.handleBlur("city")}
							value={formik.values.city}
							error={Boolean(formik.errors.city) && Boolean(formik.touched.city)}
							helperText={Boolean(formik.touched.city) && formik.errors.city}
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

						<SelectField
							label="Select Radius"
							value={value}
							name="radius"
							error={Boolean(formik.errors.radius) && Boolean(formik.touched.radius)}
							helperText={Boolean(formik.touched.radius) && formik.errors.radius}
							onChange={(item) => {
								formik.setFieldValue("radius", item.value);
								setValue(item.value);
								setIsFocus(false);
							}}
							onFocus={() => {
								setIsFocus(true);
							}}
							onBlur={() => {
								formik.handleBlur("radius");
								setIsFocus(false);
							}}
							data={lists}
							isFocus={isFocus}
						/>

						<AutocompletePlaces radius={value} handleAddress={handleAddress} handleCoords={handleCoords} />

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
					</View>
				</InnerContainer>
			</StyledContainer>
		</ScrollView>
	);
};

export default CookRegister;

const styles = StyleSheet.create({
	mapView: {
		width: "100%",
		flex: 1,
		minHeight: 360,
		backgroundColor: colors.lightGray,
		marginBottom: 20,
	},
});

const lists = [
	{ label: "5", value: "5" },
	{ label: "10", value: "10" },
	{ label: "15", value: "15" },
	{ label: "20", value: "20" },
	{ label: "25", value: "25" },
	{ label: "30", value: "30" },
	{ label: "35", value: "35" },
	{ label: "40", value: "40" },
	{ label: "45", value: "45" },
	{ label: "50", value: "50" },
];
