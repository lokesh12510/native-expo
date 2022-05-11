import { View, Text, StyleSheet, FlatList, ScrollView, RefreshControl, Alert } from "react-native";
import React, { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../theme/AppTheme";
import KitchenCard from "./KitchenCard";
import { useGetKitchensMutation } from "../../app/services/kitchenApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import KitchenSkeleton from "./KitchenSkeleton";
import { Routes } from "../../constants/routes";

const { colors, SIZES } = theme;

const KitchenList = ({ refreshState }) => {
	const navigation = useNavigation();

	const [getKitchens, { isError, data: kitchenList = [], isLoading, isSuccess }] = useGetKitchensMutation();

	const { longitude, latitude } = useSelector((state) => state.user.location);

	// * This hook is called when user focus or return to this screen
	useFocusEffect(
		useCallback(() => {
			getKitchens({
				page: 1,
				perPage: 100,
				latitude: latitude,
				longitude: longitude,
			});
		}, [longitude, latitude, refreshState])
	);

	useEffect(() => {
		if (isSuccess && kitchenList.total === 0) {
			Alert.alert(
				"No Kitchens Found",
				"Please change the current location, kitchens are not available in your location!",
				[
					{
						text: "Change Location",
						onPress: () => navigation.navigate(Routes.customer.changeLocation),
					},
				],
				{ cancelable: false }
			);
		}
	}, [isSuccess]);

	return (
		<>
			<View style={[styles.sliderContainer]}>
				<View style={styles.sectionTitleContainer}>
					<Text style={[styles.sectionTitle]}>Popular Kitchen's</Text>
				</View>
				<View style={styles.sliderItemContainer}>
					<>
						<FlatList
							data={kitchenList.list}
							showsHorizontalScrollIndicator={false}
							horizontal
							renderItem={({ item, index }) => <KitchenCard item={item} index={index} />}
							keyExtractor={(item) => item.id}
							disableIntervalMomentum
							decelerationRate={0}
							snapToInterval={320} //your element width
							snapToAlignment={"center"}
							ListEmptyComponent={<KitchenSkeleton />}
						/>
					</>
				</View>
			</View>
		</>
	);
};

export default KitchenList;

const styles = StyleSheet.create({
	sliderContainer: {
		paddingVertical: 8,
		paddingHorizontal: 8,
	},
	sectionTitleContainer: {
		paddingBottom: 7,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.text,
		marginLeft: 10,
		textTransform: "uppercase",
	},
	sliderItemContainer: {
		width: SIZES.width,
		marginVertical: 5,
	},
});
