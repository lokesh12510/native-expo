import { View, Text, StyleSheet } from "react-native";
import React from "react";

const FoodListSkeleton = () => {
  return [...Array(3)].map((item, index) => {
    return <View key={index} style={styles.skeleton}></View>;
  });
};

export default FoodListSkeleton;

const styles = StyleSheet.create({
  skeleton: {
    width: "100%",
    height: 130,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 7,
    elevation: 6,
  },
});
