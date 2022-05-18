import { View, Text, ScrollView, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addItem, removeItem } from "../../../app/slices/cartSlice";
import StyledBtn from "../../../theme/uiSinppets/StyledBtn";
import theme from "../../../theme/AppTheme";
import AppImages from "../../../constants/Images";
import { Routes } from "../../../constants/routes";
import { useLayoutEffect } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { Button } from "react-native-paper";

const Cart = ({ navigation }) => {
	const { cartItems, cartItemsCount, cartTotalAmount } = useSelector((state) => state.cart);
	// select Auth]
	const { authToken } = useSelector((state) => state.auth);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<MaterialIcons name="arrow-back" size={30} onPress={() => navigation.navigate(Routes.customer.home)} />
			),
			headerLeftContainerStyle: { marginLeft: 15 },
		});
	}, []);

	return (
		<>
			<View
				style={{
					padding: 10,
					paddingHorizontal: 16,
					backgroundColor: theme.colors.secondary,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Text style={{ fontSize: 16, fontWeight: "600" }}>Item Count : {cartItemsCount}</Text>
				<Text style={{ fontSize: 16, fontWeight: "600" }}>Grand Total : {cartTotalAmount}</Text>
			</View>
			{cartItemsCount === 0 ? (
				<View style={styles.emptyContainer}>
					<Image style={styles.image} source={AppImages.EmptyCart} />
					<Text style={styles.text}>Your Cart is empty!</Text>
					<Button mode="contained" color={theme.colors.primary}>
						Go To Home
					</Button>
				</View>
			) : (
				<>
					<ScrollView contentContainerStyle={styles.container}>
						{cartItems.map((item, index) => {
							return <CartItem key={index} item={item} />;
						})}
					</ScrollView>

					<View style={{ bottom: -6, paddingHorizontal: 10, paddingVertical: 5 }}>
						<StyledBtn
							title={`Confirm Order (₹ ${cartTotalAmount})`}
							onPress={() =>
								authToken
									? navigation.navigate(Routes.customer.confirm)
									: navigation.navigate(Routes.auth.customerLogin, { isConfirm: true })
							}
						/>
					</View>
				</>
			)}
		</>
	);
};

export default Cart;

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	emptyContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	image: {
		resizeMode: "contain",
	},
	text: {
		textTransform: "uppercase",
		marginVertical: 25,
	},
});
