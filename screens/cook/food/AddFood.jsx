import { View, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { GlobalStyles } from "../../../theme/Styles";
import theme from "../../../theme/AppTheme";
import StyledTextField from "../../../theme/uiSinppets/StyledTextField";
import { useLayoutEffect } from "react";
import { boolean, number, object, string } from "yup";
import PrimaryBtn from "../../../theme/uiSinppets/PrimaryBtn";
import { useFormik } from "formik";
import { useAuthCookRegisterMutation } from "../../../app/services/authApi";
import SelectField from "../../../components/SelectField";
import { Switch } from "react-native-paper";
import { MaterialIcons } from "react-native-vector-icons";
import IconBtn from "../../../theme/uiSinppets/IconBtn";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { useAddFoodMutation } from "../../../app/services/foodListApi";

const { colors, SIZES } = theme;
const AddFood = () => {
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);
	const [isSwitchOn, setIsSwitchOn] = React.useState(false);
	const onToggleSwitch = () => {
		setIsSwitchOn((s) => !s);
	};
	const [ingredients, setIngredients] = useState([]);
	const handleIngredients = (id, text) => {
		setIngredients((ing) => ing.map((item, index) => (index === id ? { ...item, ingredient: text } : item)));
	};
	const deleteIngredient = (id) => {
		setIngredients((ing) => ing.filter((item, index) => index !== id && item));
	};

	const { profile } = useSelector((state) => state.user);

	// imagePicker
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
			setHasGalleryPermission(galleryStatus.status === "granted");
		})();
	}, []);

	if (hasGalleryPermission === false) {
		return <Text>Need Access to proceed!</Text>;
	}

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		console.log(result);

		if (!result.cancelled) {
			console.log(result);
			setImage(result);
		}
	};

	console.log(ingredients);
	// authLogin RTK Query
	const [addFood, { data, isLoading, isError, error, isSuccess }] = useAddFoodMutation();
	// Form Validation using `formik`
	const formik = useFormik({
		initialValues: {
			foodName: "",
			foodType: "",
			price: "",
			description: "",
		},
		onSubmit: (values, { setSubmitting }) => {
			console.log("form");
			handleAddFood(values, setSubmitting);
		},
		validationSchema: object({
			foodName: string().required("Enter Food Name"),
			foodType: string().required("Select Food Type"),
			price: number("Please Enter valid Price!").required("Enter Food Price"),
			description: string(),
		}),
	});

	console.log(image);

	// Cook Registration handler
	const handleAddFood = async (credential, setSubmitting) => {
		console.log(credential, "********");
		let formData = new FormData();

		// const response = await fetch(image.uri);
		// const blob = await response.blob();

		formData.append("food_name", credential.foodName);
		formData.append("food_type_id", credential.foodType);
		formData.append("short_description", credential.description);
		formData.append("price", credential.price);
		formData.append("status", JSON.stringify(isSwitchOn));
		if (image) {
			formData.append("image_url", image.uri);
			formData.append("image_file", image);
		}
		if (ingredients.length > 0) {
			formData.append("ingredientDetails", JSON.stringify(ingredients));
		}
		formData.append("chef_id", JSON.stringify(profile.id));

		console.log(formData);
		addFood(formData);
		setSubmitting(false);
	};

	useEffect(() => {
		if (isSuccess) console.log(data);
		if (isError) console.log(error);
	}, [isSuccess]);

	return (
		<ScrollView style={[GlobalStyles.container]}>
			<View style={styles.formContainer}>
				<StyledTextField
					label="Food Name"
					name="foodName"
					icon="mail-outline"
					placeholder="Enter Food Name"
					mode="outlined"
					onChangeText={formik.handleChange("foodName")}
					error={Boolean(formik.errors.foodName) && Boolean(formik.touched.foodName)}
					helperText={Boolean(formik.touched.foodName) && formik.errors.foodName}
					onBlur={formik.handleBlur("foodName")}
					value={formik.values.foodName}
				/>
				<SelectField
					label="Select Food Type"
					value={value}
					name="foodType"
					error={Boolean(formik.errors.foodType) && Boolean(formik.touched.foodType)}
					helperText={Boolean(formik.touched.foodType) && formik.errors.foodType}
					onChange={(item) => {
						formik.setFieldValue("foodType", item.value);
						setValue(item.value);
						setIsFocus(false);
					}}
					onFocus={() => {
						setIsFocus(true);
					}}
					onBlur={() => {
						formik.handleBlur("foodType");
						setIsFocus(false);
					}}
					data={types}
					isFocus={isFocus}
				/>
				<StyledTextField
					label="Price"
					name="price"
					icon="mail-outline"
					placeholder="Enter Price"
					mode="outlined"
					onChangeText={formik.handleChange("price")}
					error={Boolean(formik.errors.price) && Boolean(formik.touched.price)}
					helperText={Boolean(formik.touched.price) && formik.errors.price}
					onBlur={formik.handleBlur("price")}
					value={formik.values.price}
				/>
				<StyledTextField
					label="Description"
					name="description"
					icon="mail-outline"
					placeholder="Enter Description"
					mode="outlined"
					multiline={true}
					onChangeText={formik.handleChange("description")}
					error={Boolean(formik.errors.description) && Boolean(formik.touched.description)}
					helperText={Boolean(formik.touched.description) && formik.errors.description}
					onBlur={formik.handleBlur("description")}
					value={formik.values.description}
				/>
				<View style={[GlobalStyles.flexRowStart, { marginBottom: 5 }]}>
					<Text>Food Status : </Text>
					<Switch value={isSwitchOn} style={{ height: 30 }} color={colors.primary} onValueChange={onToggleSwitch} />
				</View>
				<View style={{ marginVertical: 10 }}>
					<Text>Add Image : </Text>
					<Pressable style={styles.imageView} onPress={pickImage}>
						<View style={styles.overlay}>
							<Text>Click to add Images</Text>
						</View>
						{image && <Image source={{ uri: image.uri }} style={{ width: "100%", height: "100%" }} />}
					</Pressable>
				</View>
			</View>
			<View style={[styles.formContainer]}>
				<View style={[GlobalStyles.flexRowJustify, { marginVertical: 10, marginBottom: 20 }]}>
					<Text> Food Ingredients</Text>
					<IconBtn onPress={() => setIngredients((ing) => [...ing, { ingredient: "" }])}>
						<MaterialIcons name="add-circle" size={30} color={theme.colors.primary} />
					</IconBtn>
				</View>
				{ingredients.map((item, index) => {
					return (
						<View style={GlobalStyles.flexRowJustify} key={index}>
							<View style={{ flex: 2 }}>
								<StyledTextField
									label={`Ingredient ${index + 1}`}
									name={index}
									icon="mail-outline"
									placeholder={`Enter Ingredient ${index + 1}`}
									mode="outlined"
									onChangeText={(text) => handleIngredients(index, text)}
									value={item.ingredient}
								/>
							</View>
							{index > 0 && (
								<IconBtn onPress={() => deleteIngredient(index)}>
									<MaterialIcons name="delete" size={30} color={theme.colors.primary} />
								</IconBtn>
							)}
						</View>
					);
				})}
			</View>
			<View style={[styles.formContainer]}>
				<PrimaryBtn
					isLoading={isLoading}
					mode="contained"
					onPress={formik.handleSubmit}
					title="Submit"
					disabled={!formik.isValid}
				>
					Submit
				</PrimaryBtn>
			</View>
		</ScrollView>
	);
};

export default AddFood;

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: colors.white,
		padding: SIZES.padding,
		marginBottom: 10,
	},
	imageView: {
		width: "100%",
		height: 150,
		backgroundColor: colors.secondary,
		borderRadius: 5,
		overflow: "hidden",
		marginVertical: 10,
		position: "relative",
	},
	overlay: {
		position: "absolute",
		zIndex: 2,
		width: "100%",
		height: "100%",
		backgroundColor: `${colors.black}15`,
		justifyContent: "center",
		alignItems: "center",
	},
});

const types = [
	{ label: "Breakfast", value: "1" },
	{ label: "Lunch", value: "2" },
	{ label: "Snacks", value: "3" },
	{ label: "Dinner", value: "4" },
];
