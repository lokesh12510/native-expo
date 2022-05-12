import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { GlobalStyles } from "../../../theme/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Routes } from "../../../constants/routes";
import { TextInput } from "react-native-paper";
import FoodITem from "./FoodITem";

const Food = ({ navigation }) => {
	return (
		<View style={[GlobalStyles.container]}>
			<FlatList data={data.list} renderItem={({ item }) => <FoodITem item={item} />} keyExtractor={(item) => item.id} />
		</View>
	);
};

export default Food;

const styles = StyleSheet.create({
	stickyHeader: {
		bottom: 0,
		padding: 10,
	},
});

const data = {
	total: 3,
	list: [
		{
			id: 115,
			order_id: 86,
			food_id: 10,
			no_of_items: 1,
			delivery_status: 1,
			price: 25,
			vat: null,
			date_time: "2022-05-13T04:53:46.000Z",
			day: "Friday",
			hour: "10-11",
			period: "AM",
			product_price: 25,
			createdAt: "2022-05-10T04:54:37.000Z",
			updatedAt: "2022-05-10T04:54:37.000Z",
			food: {
				id: 10,
				chef_id: 11,
				food_name: "idly",
				short_description: "<p>madurai idly</p>",
				image_url: "uploads/food/File_862708be-029c-4fd8-ba53-1938f32d5656.jpg",
				food_type_id: 1,
				price: "25.00",
				rating: "5.0",
				favourite: null,
				status: true,
				deletedAt: null,
				createdAt: "2022-04-14T13:14:01.000Z",
				updatedAt: "2022-04-18T09:10:10.000Z",
			},
			order: {
				id: 86,
				user_id: 20,
				order_reference_number: "6879",
				total_price: "25.00",
				order_date_time: null,
				payment_status: 1,
				payment_type: "Cash",
				address: '"18, Town Hall, Coimbatore, Tamil Nadu 641001, India"',
				createdAt: "2022-05-10T04:54:37.000Z",
				updatedAt: "2022-05-10T04:54:37.000Z",
				user: {
					name: "loki",
					contact_number: "8098174100",
				},
			},
		},
		{
			id: 129,
			order_id: 96,
			food_id: 20,
			no_of_items: 1,
			delivery_status: 1,
			price: 40,
			vat: null,
			date_time: "2022-05-13T07:30:19.000Z",
			day: "Friday",
			hour: "01-02",
			period: "PM",
			product_price: 40,
			createdAt: "2022-05-11T07:30:31.000Z",
			updatedAt: "2022-05-11T07:30:31.000Z",
			food: {
				id: 20,
				chef_id: 13,
				food_name: "ragi dosai",
				short_description: "",
				image_url: "uploads/food/File_7a2844ef-0b67-49c9-9ff4-ce96e42444da.jpg",
				food_type_id: 4,
				price: "40.00",
				rating: "0.0",
				favourite: null,
				status: true,
				deletedAt: null,
				createdAt: "2022-04-18T06:10:52.000Z",
				updatedAt: "2022-04-18T06:10:52.000Z",
			},
			order: {
				id: 96,
				user_id: 47,
				order_reference_number: "3961",
				total_price: "105.00",
				order_date_time: null,
				payment_status: 1,
				payment_type: "Cash",
				address: '"Gandhipuram Bus Stand, Doctor Nanjapaa Road, ATT Colony, Gopalapuram, Coimbatore, Tamil Nadu, India"',
				createdAt: "2022-05-11T07:30:31.000Z",
				updatedAt: "2022-05-11T07:30:31.000Z",
				user: {
					name: "cus3",
					contact_number: "9999999999",
				},
			},
		},
		{
			id: 117,
			order_id: 88,
			food_id: 12,
			no_of_items: 1,
			delivery_status: 1,
			price: 100,
			vat: null,
			date_time: "2022-05-13T09:51:22.000Z",
			day: "Friday",
			hour: "03-04",
			period: "PM",
			product_price: 100,
			createdAt: "2022-05-10T09:51:41.000Z",
			updatedAt: "2022-05-10T09:51:41.000Z",
			food: {
				id: 12,
				chef_id: 14,
				food_name: "pizza",
				short_description: "",
				image_url: "uploads/food/File_2e8c4ada-97a1-4ae0-97a6-b458583805a5.jpg",
				food_type_id: 3,
				price: "100.00",
				rating: "5.0",
				favourite: null,
				status: true,
				deletedAt: null,
				createdAt: "2022-04-14T13:14:36.000Z",
				updatedAt: "2022-04-18T06:49:41.000Z",
			},
			order: {
				id: 88,
				user_id: 20,
				order_reference_number: "5580",
				total_price: "130.00",
				order_date_time: null,
				payment_status: 1,
				payment_type: "Cash",
				address: '"85/14, Street No - 4, Kurichchi, Coimbatore, Tamil Nadu 641024, India"',
				createdAt: "2022-05-10T09:51:41.000Z",
				updatedAt: "2022-05-10T09:51:41.000Z",
				user: {
					name: "loki",
					contact_number: "8098174100",
				},
			},
		},
	],
};
