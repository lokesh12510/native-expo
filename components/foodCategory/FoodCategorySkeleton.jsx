import { View, Text, StyleSheet } from "react-native";
import React from "react";

const FoodTypeSkeleton = () => {
  return [...Array(4)].map((item, index) => {
    return <View key={index} style={styles.skeleton} />;
  });
};

export default FoodTypeSkeleton;

const styles = StyleSheet.create({
  skeleton: {
    width: 85,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
    marginRight: 8,
  },
});
