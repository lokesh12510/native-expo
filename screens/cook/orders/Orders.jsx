import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../../../theme/Styles";
import { Routes } from "../../../constants/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectField from "../../../components/SelectField";
import Snackbar from "../../../components/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useGetOrdersMutation } from "../../../app/services/ordersApi";
import { setCurrentPage } from "../../../app/slices/ordersSlice";
import theme from "../../../theme/AppTheme";

const { colors } = theme;

const Orders = ({ navigation }) => {
	const [getOrders, { isLoading, isSuccess, isError }] = useGetOrdersMutation();
	const { ordersList = [], currentPage, perPage, endReached } = useSelector((state) => state.orders);
	const { profile } = useSelector((state) => state.user);

	const [search, setSearch] = useState("");

	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	useFocusEffect(
		useCallback(() => {
			getOrders({ page: currentPage, perPage: perPage, filter_text: search, chef_id: profile.id });
		}, [currentPage, perPage, profile.id, search])
	);

	const handleLoadMore = () => {
		console.log("more");
		if (!endReached) {
			dispatch(setCurrentPage(currentPage + 1));
		}
	};

	const onRefresh = () => {
		dispatch(setCurrentPage(1));
	};

	return (
		<View style={{ flex: 1 }}>
			<View>
				<SelectField />
			</View>

			<FlatList
				contentContainerStyle={GlobalStyles.container}
				data={ordersList}
				renderItem={({ item }) => <FoodITem item={item} />}
				keyExtractor={(item) => item.id}
				onEndReachedThreshold={0.5}
				initialNumToRender={perPage}
				onEndReached={handleLoadMore}
				refreshing={refreshing}
				onRefresh={onRefresh}
				ListFooterComponent={() => (
					<View style={[{ paddingBottom: 40 }, GlobalStyles.flexRowCenter]}>
						{endReached && <Text> You have Reached the end!</Text>}
					</View>
				)}
				ListEmptyComponent={() => {
					return isLoading ? (
						[...new Array(3)].map((item, index) => {
							return <View key={index} style={styles.foodSkeleton}></View>;
						})
					) : (
						<View style={GlobalStyles.flexRowCenter}>
							<Text>No data found</Text>
						</View>
					);
				}}
			/>

			<Snackbar />
		</View>
	);
};

export default Orders;

const styles = StyleSheet.create({
	header: {
		padding: 5,
	},
	container: {
		padding: 16,
	},
	foodSkeleton: {
		backgroundColor: colors.white,
		borderRadius: 7,
		elevation: 1,
		minHeight: 143,
		marginBottom: 10,
		width: "100%",
	},
});
