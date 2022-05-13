import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import theme from "../../../theme/AppTheme";
import moment from "moment";
import { Button, Divider, IconButton, Menu, Switch } from "react-native-paper";
import { MaterialIcons, SimpleLineIcons } from "react-native-vector-icons";
import { BASE_URL } from "../../../constants";
import IconBtn from "../../../theme/uiSinppets/IconBtn";
import { GlobalStyles } from "../../../theme/Styles";
const { colors } = theme;
import {
	fries as Snacks,
	hamburger as BreakFast,
	pizza as Dinner,
	rice_bowl as Lunch,
	salad,
} from "../../../constants/icons";
import { useDeleteFoodMutation, useSetFoodStatusMutation } from "../../../app/services/foodListApi";
import { useDispatch } from "react-redux";
import { deleteFoodItem } from "../../../app/slices/foodSlice";
import { showSnackbar } from "../../../app/slices/snackbarSlice";

const catImages = [salad, BreakFast, Lunch, Snacks, Dinner];

const FoodITem = ({ item }) => {
	const [visible, setVisible] = React.useState(false);
	const [isSwitchOn, setIsSwitchOn] = React.useState(item.status);
	const openMenu = () => setVisible(true);

	const dispatch = useDispatch();

	const closeMenu = () => setVisible(false);

	const [getFoodByKitchenId, { data, isSuccess, isLoading }] = useSetFoodStatusMutation();
	const [deleteFood, { isSuccess: isDeleteSuccess, isLoading: isDeleteLoading, isError: isDeleteError }] =
		useDeleteFoodMutation();

	const onToggleSwitch = () => {
		getFoodByKitchenId({ id: item.id, status: !item.status });
		setIsSwitchOn((s) => !s);
		dispatch(showSnackbar({ title: `Food Item "${item.food_name}" Status changed successfully!`, type: "success" }));
	};

	const handleDelete = () => {
		deleteFood({ id: item.id });
		closeMenu();
	};

	useEffect(() => {
		console.log(isDeleteSuccess);
		if (isDeleteSuccess) {
			dispatch(deleteFoodItem({ id: item.id }));
			dispatch(showSnackbar({ title: `Food Item "${item.food_name}" deleted successfully!`, type: "success" }));
		}
		if (isDeleteError) {
			dispatch(showSnackbar({ title: "Can't able to delete, Try again!", type: "error" }));
		}
	}, [isDeleteSuccess]);

	return (
		<View style={styles.foodITem}>
			<Image style={styles.image} source={{ uri: `${BASE_URL}${item.image_url}` }} />
			<View style={[styles.content, { flexDirection: "column" }]}>
				<View style={[styles.content, { padding: 0 }]}>
					<View style={{ flex: 2 }}>
						<Text style={styles.title}>{item.food_name}</Text>
						<Text style={styles.price}>&#x20B9; {item.price}</Text>
						<Text style={styles.subText}>Added on {moment(item.createdAt).format("Do MMM YYYY")}</Text>
					</View>
					<Menu
						visible={visible}
						onDismiss={closeMenu}
						anchor={
							<View style={styles.menu}>
								<IconBtn onPress={openMenu}>
									<SimpleLineIcons name="options-vertical" size={20} color={colors.gray} />
								</IconBtn>
							</View>
						}
						contentStyle={styles.menuContent}
					>
						<Menu.Item icon="square-edit-outline" titleStyle={styles.menuTitle} onPress={closeMenu} title="Edit" />
						<Divider />
						<Menu.Item icon="delete-outline" titleStyle={styles.menuTitle} onPress={handleDelete} title="Delete" />
					</Menu>
				</View>
				<Divider style={GlobalStyles.divider} />
				<View style={GlobalStyles.flexRowJustify}>
					<View style={GlobalStyles.flexRowStart}>
						<Image source={catImages[item?.food_type?.id]} style={styles.categoryImage} />
						<Text style={styles.title}>{item?.food_type?.type}</Text>
					</View>
					<Switch value={isSwitchOn} style={{ height: 30 }} color={colors.secondary} onValueChange={onToggleSwitch} />
				</View>
			</View>
		</View>
	);
};

export default FoodITem;

const styles = StyleSheet.create({
	foodITem: {
		position: "relative",
		backgroundColor: colors.white,
		borderRadius: 7,
		elevation: 1,
		minHeight: 100,
		marginBottom: 10,
		flexDirection: "row",
		overflow: "hidden",
		flex: 1,
	},
	image: {
		width: 100,
		height: "100%",
		resizeMode: "cover",
	},
	categoryImage: {
		width: 16,
		height: 16,
		resizeMode: "cover",
		marginRight: 7,
		top: -2,
	},
	content: {
		flexDirection: "row",
		padding: 10,
		flex: 2,
	},
	title: {
		fontSize: 16,
		color: colors.black,
		textTransform: "capitalize",
		marginBottom: 5,
	},
	price: {
		fontSize: 20,
		color: colors.secondary,
		fontWeight: "bold",
		marginBottom: 5,
	},
	subText: {
		fontSize: 14,
		color: colors.gray,
	},
	menu: {
		top: 0,
		right: 0,
	},
	menuContent: {
		backgroundColor: colors.secondary,
		borderRadius: 10,
		top: 5,
		right: 5,
		width: 150,
	},
	menuTitle: {
		color: colors.white,
		padding: 0,
		margin: 0,
	},
});
