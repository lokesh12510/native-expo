import { View, Text, StyleSheet } from "react-native";
import React from "react";

const KitchenSkeleton = () => {
  return [...Array(3)].map((item, index) => {
    return <View key={index} style={styles.skeleton}></View>;
  });
};

export default KitchenSkeleton;

const styles = StyleSheet.create({
  skeleton: {
    width: 340,
    height: 145,
    backgroundColor: "#f1f1f1",
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
