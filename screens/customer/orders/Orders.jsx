import { View, Text, useWindowDimensions, ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FoodItem } from "../../../components/SwipeTabsItem";
import { useLayoutEffect } from "react";
import theme from "../../../theme/AppTheme";
import OrderItem from "../../../components/orders/OrderItem";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useGetOrdersMutation } from "../../../app/services/ordersApi";
import { GlobalStyles } from "../../../theme/Styles";
import { ActivityIndicator } from "react-native-paper";

const { colors } = theme;

const Orders = ({ navigation }) => {
	const [getOrders, { data, isLoading, isSuccess }] = useGetOrdersMutation();

	useFocusEffect(
		useCallback(() => {
			getOrders({
				page: 1,
				perPage: 30,
				filterText: "",
				pageFuture: 1,
				perPageFuture: 30,
				filterTextFuture: "",
				pageActive: 1,
				perPageActive: 30,
				filterTextActive: "",
			});
		}, [])
	);

	const EmptyView = () => {
		return (
			<View style={styles.emptyContainer}>
				<Text>No Data Found</Text>
			</View>
		);
	};

	const FirstRoute = () => (
		<ScrollView style={styles.container}>
			{!isLoading && isSuccess && data.activeOrder.length > 0 ? (
				data.activeOrder.map((item, index) => {
					return <OrderItem key={index} item={item} />;
				})
			) : !isLoading ? (
				<EmptyView />
			) : (
				<View Style={GlobalStyles.container}>
					<ActivityIndicator size={"small"} color={colors.primary} />
				</View>
			)}
		</ScrollView>
	);

	const SecondRoute = () => (
		<ScrollView style={styles.container}>
			{!isLoading && isSuccess && data.futureOrder.length > 0 ? (
				data.futureOrder.map((item, index) => {
					return <OrderItem key={index} item={item} />;
				})
			) : !isLoading ? (
				<EmptyView />
			) : (
				<View Style={GlobalStyles.container}>
					<ActivityIndicator size={"small"} color={colors.primary} />
				</View>
			)}
		</ScrollView>
	);
	const ThirdRoute = () => (
		<ScrollView style={styles.container}>
			{!isLoading && isSuccess && data.list.length > 0 ? (
				data.list.map((item, index) => {
					return <OrderItem key={index} item={item} />;
				})
			) : !isLoading ? (
				<EmptyView />
			) : (
				<View Style={GlobalStyles.container}>
					<ActivityIndicator size={"small"} color={colors.primary} />
				</View>
			)}
		</ScrollView>
	);

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
		third: ThirdRoute,
	});

	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "first", title: "Active" },
		{ key: "second", title: "Upcoming" },
		{ key: "third", title: "Completed" },
	]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "My Orders",
			headerShadowVisible: false,
		});
	}, []);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
			<TabView
				renderTabBar={(props) => (
					<TabBar
						{...props}
						style={{ backgroundColor: colors.white }}
						activeColor={colors.primary}
						inactiveColor={colors.gray}
						indicatorStyle={{ backgroundColor: colors.primary }}
					/>
				)}
				tabStyle={{ width: "auto" }}
				swipeEnabled
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
			/>
		</ScrollView>
	);
};

export default Orders;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flex: 1,
		backgroundColor: "#f1f1f1",
	},
	emptyContainer: {
		padding: 16,
		flex: 1,
		backgroundColor: "#f1f1f1",
		justifyContent: "center",
		alignItems: "center",
	},
});
