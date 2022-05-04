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
import {
  clearFood,
  removeCategory,
  selectCategory,
} from "../../app/slices/foodSlice";
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

  const { categoryType } = useSelector((state) => state.food.category);

  const dispatch = useDispatch();

  const handleActiveCategory = (item) => {
    if (categoryType === item.id) {
      dispatch(clearFood());
      dispatch(removeCategory());
    } else {
      dispatch(clearFood());
      dispatch(selectCategory({ category: item }));
    }
  };
  return (
    <View style={styles.container}>
      {!isLoading &&
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
    justifyContent: "center",
  },
  categoryItem: {
    flex: 1,
    height: 80,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    backgroundColor: "#f6f6f6",
    margin: 2,
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
