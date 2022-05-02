import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import {
  fries as Snacks,
  hamburger as BreakFast,
  pizza as Dinner,
  rice_bowl as Lunch,
  salad,
} from "../../constants/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../theme/AppTheme";
import { removeCategory, selectCategory } from "../../app/slices/FilterSlice";
import { useGetFoodTypeListMutation } from "../../app/services/foodTypeApi";
import { useEffect } from "react";
import FoodTypeSkeleton from "./FoodCategorySkeleton";

const { colors, SIZES } = theme;

const catImages = [salad, BreakFast, Lunch, Snacks, Dinner];

const CategoryItem = ({ item, onPress, activeCategory }) => {
  return (
    <Pressable
      style={[styles.categoryItem, activeCategory === item.id && styles.active]}
      onPress={() => onPress(item)}
      android_ripple={{ color: "#cccccc3e" }}
    >
      <Image source={catImages[item.id]} style={styles.categoryImage} />
      <Text
        style={[
          styles.categoryTitle,
          activeCategory === item.id && { color: "#fff", fontWeight: "bold" },
        ]}
      >
        {item.type}
      </Text>
    </Pressable>
  );
};

const FoodCategory = () => {
  const [getFoodTypeList, { isError, data: foodTypeList = [], isLoading }] =
    useGetFoodTypeListMutation();

  useEffect(() => {
    getFoodTypeList();
  }, []);

  console.log(foodTypeList);

  const { categoryType } = useSelector((state) => state.filter.category);

  const dispatch = useDispatch();

  const handleActiveCategory = (item) => {
    if (categoryType === item.id) {
      dispatch(removeCategory());
    } else {
      dispatch(selectCategory({ category: item }));
    }
  };
  return (
    <View style={styles.container}>
      {!isLoading &&
        foodTypeList.length &&
        foodTypeList.map((item, index) => {
          return (
            <CategoryItem
              key={index}
              item={item}
              onPress={handleActiveCategory}
              activeCategory={categoryType}
            />
          );
        })}
      {isLoading && <FoodTypeSkeleton />}
    </View>
  );
};

export default FoodCategory;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: 85,
    height: 80,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    backgroundColor: "#f6f6f6",
    marginRight: 5,
  },
  categoryImage: {
    width: 35,
    height: 35,
    resizeMode: "cover",
    marginBottom: 7,
  },
  categoryTitle: {
    fontSize: 12,
    color: colors.gray,
    textTransform: "uppercase",
  },
  active: {
    backgroundColor: colors.primary,
    color: "#fff",
    elevation: 7,
  },
});

const DATA = [
  {
    id: 1,
    type: "BreakFast",
  },
  {
    id: 2,
    type: "Lunch",
  },
  {
    id: 3,
    type: "Snacks",
  },
  {
    id: 4,
    type: "Dinner",
  },
];
