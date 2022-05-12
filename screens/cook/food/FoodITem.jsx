import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import theme from "../../../theme/AppTheme";
import moment from "moment";
import { Button, IconButton, Menu } from "react-native-paper";
import { MaterialIcons } from "react-native-vector-icons";
const { colors } = theme;

const FoodITem = ({ item }) => {
	const [visible, setVisible] = React.useState(false);

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);
	return (
		<View style={styles.foodITem}>
			<Image style={styles.image} source={require("../../../assets/images/food1.jpg")} />
			<View style={styles.content}>
				<Text style={styles.title}>{item.food.food_name}</Text>
				<Text style={styles.price}>{item.food.price}</Text>
				<Text style={styles.subText}>{moment(item.food.createdAt).format("Do MMM YYYY")}</Text>
			</View>

			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchor={
					<IconButton onPress={openMenu}>
						<MaterialIcons name="remove" size={25} color={colors.gray} />
					</IconButton>
				}
			>
				<Menu.Item onPress={() => {}} title="Item 1" />
				<Menu.Item onPress={() => {}} title="Item 2" />

				<Menu.Item onPress={() => {}} title="Item 3" />
			</Menu>
		</View>
	);
};

export default FoodITem;

const styles = StyleSheet.create({
	foodITem: {
		backgroundColor: colors.white,
		borderRadius: 7,
		elevation: 1,
		minHeight: 100,
		marginBottom: 10,
		flexDirection: "row",
		overflow: "hidden",
	},
	image: {
		width: 100,
		height: "100%",
		resizeMode: "cover",
	},
	content: {
		padding: 10,
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
});
