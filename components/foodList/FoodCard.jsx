import { useLayoutEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../theme/AppTheme";
import { addItem, removeItem } from "../../app/slices/cartSlice";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { GlobalStyles } from "../../theme/Styles";
import { useEffect } from "react";

const { colors, SIZES } = theme;

const FoodCard = ({ item }) => {
	const [isAdded, setIsAdded] = useState(false);

	const dispatch = useDispatch();

	const { cartItems, cartItemsCount } = useSelector((state) => state.cart);

	// const [itemCount, setItemCount] = useState(0);

	const addToCart = (item) => {
		// setItemCount((count) => count + 1);
		setIsAdded(true);
		dispatch(addItem(item));
	};
	const removeFromCart = (id) => {
		dispatch(removeItem({ id }));
		// setItemCount((count) => count > 0 && count - 1);
	};

	// // * This hook is called when user focus or return to this screen

	useEffect(() => {
		setIsAdded(false);
		console.log(isAdded);
		cartItems.map((food) => food.id === item.id && setIsAdded(true));
	}, [isAdded, cartItems, cartItemsCount]);

	return (
		<View>
			<Pressable style={styles.swipeItem} onPress={() => console.log(item)}>
				<View style={styles.foodContentContainer}>
					<View style={styles.foodContent}>
						<Text style={styles.foodTitle}>{item.food_name}</Text>
					</View>
					<View style={styles.foodContent}>
						<Text style={styles.foodContentText}>&#x20B9; {item.price}</Text>
					</View>
					<View style={[styles.foodContent, GlobalStyles.flexRowStart]}>
						<MaterialIcons name="star" size={20} color={colors.secondary} style={{ left: -3 }} />
						<Text style={styles.foodContentText}>{item.rating}</Text>
					</View>
					<View style={styles.divider}></View>
					<View style={[styles.extraContent, GlobalStyles.flexRowStart]}>
						<View style={[styles.extraContentWrapper, { marginRight: 10 }]}>
							<MaterialCommunityIcons name="map-marker-radius-outline" size={15} color={colors.primary} />
							<Text style={styles.offerText}>{parseFloat(item.distance).toFixed(2)} km</Text>
						</View>
						{item.id % 2 === 0 && (
							<View style={styles.extraContentWrapper}>
								<MaterialCommunityIcons name="sale" size={15} color={colors.primary} />
								<Text style={styles.offerText}>Offer Available</Text>
							</View>
						)}
					</View>
				</View>
				<View style={styles.foodImageContainer}>
					<View style={[styles.imageWrapper, isAdded && { borderColor: colors.green, borderWidth: 2 }]}>
						<Image
							style={styles.foodImage}
							source={{
								uri: item.image_url,
							}}
						/>
					</View>
					{isAdded ? (
						<View style={[styles.actionBtnOutline, { borderRadius: 50 }]}>
							<>
								<Pressable
									// onPress={() => removeFromCart(item.id)}
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Ionicons name="ios-checkmark-circle-sharp" size={20} color={colors.white} />
									<Text style={[styles.itemCountOutline]}>Added</Text>
								</Pressable>
							</>
						</View>
					) : (
						<View style={[styles.actionBtns, { borderRadius: 10 }]}>
							<>
								<Pressable onPress={() => addToCart(item)}>
									<Text style={[styles.itemCount]}>Add</Text>
								</Pressable>
							</>
						</View>
					)}
				</View>
			</Pressable>
		</View>
	);
};

export default FoodCard;

const styles = StyleSheet.create({
	swipeItem: {
		minHeight: 130,
		padding: 8,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f1f1f1",
		margin: 5,
		borderRadius: 8,
		elevation: 3,
	},
	foodImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		backgroundColor: "#f1f1f1",
	},
	foodImageContainer: {
		height: 90,
		alignItems: "center",
	},
	imageWrapper: {
		width: 100,
		height: 90,
		borderRadius: 8,
		elevation: 6,
		borderRadius: 7,
		overflow: "hidden",
	},
	foodContentContainer: {
		paddingHorizontal: 8,
		flexGrow: 1,
		flexDirection: "column",
		width: 0,
	},
	foodContent: {
		marginBottom: 5,
	},
	foodTitle: {
		fontSize: 16,
		color: "#2c2b2b",
		fontWeight: "bold",
		flexShrink: 1,
		textTransform: "capitalize",
	},
	foodContentText: {
		fontSize: 18,
		color: colors.gray,
		flexWrap: "wrap",
	},
	actionBtns: {
		flexDirection: "row",
		backgroundColor: colors.primary,
		bottom: 20,
		left: 0,
		right: 0,
		padding: 2,
		marginLeft: "auto",
		marginRight: "auto",
		justifyContent: "center",
		alignItems: "center",
		elevation: 7,
	},
	actionBtnOutline: {
		flexDirection: "row",
		backgroundColor: colors.green,
		borderColor: colors.green,
		borderWidth: 1,
		bottom: 20,
		left: 0,
		right: 0,
		padding: 2,
		marginLeft: "auto",
		marginRight: "auto",
		justifyContent: "center",
		alignItems: "center",
		elevation: 7,
	},
	itemCount: {
		fontSize: 18,
		color: colors.white,
		paddingHorizontal: 7,
		fontWeight: "bold",
	},
	itemCountOutline: {
		fontSize: 16,
		color: colors.white,
		paddingHorizontal: 6,
	},
	foodType: {
		width: 15,
		height: 15,
		borderRadius: 4,
		padding: 2,
		borderWidth: 1,
		marginBottom: 7,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 50,
	},
	divider: {
		width: "95%",
		height: 1,
		marginVertical: 3,
		backgroundColor: "#d8d8d8",
		borderRadius: 50,
	},
	extraContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 5,
	},
	extraContentWrapper: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	offerText: {
		fontSize: 13,
		color: colors.primary,
		marginHorizontal: 3,
	},
	addBtn: {
		width: 50,
		height: 30,
		backgroundColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		bottom: 20,
		zIndex: 2,
		elevation: 7,
	},
	selectedKitchenContainer: {
		backgroundColor: theme.colors.secondary,
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	kitchenImageContainer: {
		width: 70,
		height: 70,
		borderRadius: 10,
		elevation: 8,
		overflow: "hidden",
	},
	image: { width: "100%", height: "100%", resizeMode: "cover" },
	tabContainer: {
		paddingHorizontal: 16,
		flex: 1,
		// flexDirection: "column",
		// height: 400,
		height: SIZES.height - 45,
	},
	kitchenContent: {
		paddingHorizontal: 10,
		flex: 2,
	},
	kitchenTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 3,
		color: colors.black,
	},
	subTitle: {
		fontSize: 14,
		color: colors.black,
	},
	IconBtn: {
		margin: 2,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
});
