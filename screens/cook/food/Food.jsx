import { View, Text, Button, StyleSheet, FlatList, ScrollView } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../../../theme/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Routes } from "../../../constants/routes";
import { Searchbar, TextInput } from "react-native-paper";
import FoodITem from "./FoodITem";
import { useGetFoodByKitchenIdMutation } from "../../../app/services/foodListApi";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import theme, { colors } from "../../../theme/AppTheme";
import { MaterialIcons, Feather } from "react-native-vector-icons";
import IconBtn from "../../../theme/uiSinppets/IconBtn";
import { clearFood, setCurrentPage, setPerPage } from "../../../app/slices/foodSlice";
import Snackbar from "../../../components/Snackbar";

const Food = ({ navigation }) => {
	const [getFoodByKitchenId, { isLoading, isSuccess, isError }] = useGetFoodByKitchenIdMutation();
	const { foodList = [], currentPage, perPage, endReached } = useSelector((state) => state.food.food);
	const { profile } = useSelector((state) => state.user);

	const [search, setSearch] = useState("");
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();

	const { isVisible } = useSelector((state) => state.snackbar);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRightContainerStyle: { padding: 10 },
			headerRight: () => (
				<IconBtn>
					<MaterialIcons name="add" size={30} color={theme.colors.black} />
				</IconBtn>
			),
		});
	}, []);

	const handleChangeText = (text) => {
		dispatch(clearFood());
		setSearch(text);
	};

	useFocusEffect(
		useCallback(() => {
			getFoodByKitchenId({ page: currentPage, perPage: perPage, food_name: search, chef_id: profile.id });
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
				<Searchbar placeholder="Search Food" value={search} onChangeText={handleChangeText} />
			</View>

			<FlatList
				contentContainerStyle={styles.container}
				data={foodList}
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

export default Food;

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
