import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import theme from "../../theme/AppTheme";
import { Divider } from "react-native-paper";
import moment from "moment";

const { colors } = theme;

const OrderItem = ({ item }) => {
	return (
		<View style={styles.wrapper}>
			<Text
				style={{
					fontSize: 16,
					fontWeight: "bold",
					color: colors.gray,
				}}
			>
				Order ID : {item.order_id}
			</Text>
			<Divider style={styles.divider} />

			<View style={styles.orderItem}>
				<Image
					source={{
						uri: item.food.image_url,
					}}
					style={styles.image}
				/>
				<View style={styles.content}>
					<Text style={styles.title}>{item.food.food_name}</Text>
					<Text style={styles.qty}>Quantity : {item.no_of_items}</Text>
					<Text style={styles.qty}>Delivery Date : {moment(item.date_time).format("MMMM Do YYYY")}</Text>
					<Text style={styles.price}>&#x20B9; {item.price}</Text>
				</View>
			</View>
		</View>
	);
};

export default OrderItem;

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: colors.white,
		padding: 16,
		borderRadius: 10,
		marginBottom: 7,
	},
	orderItem: {
		flexDirection: "row",
	},
	image: {
		width: 80,
		height: 80,
		resizeMode: "cover",
		borderRadius: 5,
	},
	content: {
		flexDirection: "column",
		paddingHorizontal: 15,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 2,
		textTransform: "capitalize",
	},
	price: {
		fontSize: 20,
		marginBottom: 2,
		color: colors.secondary,
		fontWeight: "bold",
	},
	qty: {
		fontSize: 14,
		marginBottom: 2,
		fontWeight: "bold",
		color: colors.gray,
	},
	totalContainer: {
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	divider: {
		marginVertical: 10,
	},
});
