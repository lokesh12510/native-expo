import { View, Text, StyleSheet, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import React, { useCallback, useState } from "react";
import theme from "../../../theme/AppTheme";

import FloatingCart from "../../../components/FloatingCart";
import { useSelector } from "react-redux";
import KitchenList from "../../../components/Kitchen/KitchenList";
import FoodCategory from "../../../components/foodCategory/FoodCategory";
import FoodList from "../../../components/foodList/FoodListContainer";
import { useEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

const { colors } = theme;

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = () => {
	const netInfo = useNetInfo();
	const { cartItemsCount } = useSelector((state) => state.cart);
	const { profile } = useSelector((state) => state.user);

	const [refreshing, setRefreshing] = useState(false);
	const [refreshState, setRefreshState] = useState(false);

	useEffect(() => {}, [refreshState, netInfo.isConnected]);

	const onRefresh = useCallback(() => {
		setRefreshing((t) => !t);
		setRefreshState((t) => !t);

		wait(1000).then(() => setRefreshing((t) => !t));
	}, [netInfo.isConnected]);

	return (
		<SafeAreaView style={styles.root}>
			<ScrollView
				nestedScrollEnabled={true}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				{/* Hero Text Container*/}
				{profile.name && (
					<View style={styles.heroTextContainer}>
						<Text style={styles.heroText1}>Hi, {profile?.name}</Text>
						<Text style={styles.heroText2}>Order Food Online from the best Homecook</Text>
					</View>
				)}
				{/* Hero Text Container*/}

				{/* Kitchen Slider  */}
				<KitchenList refreshState={refreshState} />
				{/* Kitchen Slider  */}
				{/* Food Category Container */}
				<FoodCategory refreshState={refreshState} />
				{/* Food Category Container */}

				{/* Food Items Container */}
				<FoodList refreshState={refreshState} />
				{/* Food Items Container */}
			</ScrollView>
			{/* Floating Cart View */}
			{cartItemsCount > 0 && <FloatingCart />}
			{/* Floating Cart View */}
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		width: theme.SIZES.width,
		backgroundColor: "#fff",
		position: "relative",
	},
	container: {
		paddingHorizontal: 16,
	},
	heroTextContainer: {
		paddingHorizontal: 16,
		marginVertical: 16,
	},
	heroText1: {
		fontSize: 25,
		color: colors.secondary,
		fontWeight: "bold",
		marginBottom: 7,
	},
	heroText2: {
		fontSize: 16,
		color: colors.darkLight,
		fontWeight: "bold",
	},
});
