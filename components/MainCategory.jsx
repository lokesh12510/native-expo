import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { fries, hamburger, pizza, rice_bowl, salad } from "../constants/icons";
import theme from "../theme/AppTheme";
import { useState } from "react";

const { colors, SIZES } = theme;

const CategoryItem = ({ item, onPress, activeCategory }) => {
  return (
    <Pressable
      style={[styles.categoryItem, activeCategory === item.id && styles.active]}
      onPress={() => onPress(item.id)}
      android_ripple={{ color: "#cccccc3e" }}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text
        style={[
          styles.categoryTitle,
          activeCategory === item.id && { color: "#fff", fontWeight: "bold" },
        ]}
      >
        {item.title}
      </Text>
    </Pressable>
  );
};

const MainCategory = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const handleActiveCategory = (id) => {
    setActiveCategory((activeId) => (activeId === id ? 0 : id));
  };
  return (
    <View style={styles.container}>
      {DATA.map((item, index) => {
        return (
          <CategoryItem
            key={index}
            item={item}
            onPress={handleActiveCategory}
            activeCategory={activeCategory}
          />
        );
      })}
    </View>
  );
};

export default MainCategory;

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
    title: "Breakfast",
    image: hamburger,
  },
  {
    id: 2,
    title: "Lunch",
    image: rice_bowl,
  },
  {
    id: 3,
    title: "Dinner",
    image: pizza,
  },
  {
    id: 4,
    title: "Snacks",
    image: fries,
  },
];
