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
    width: 310,
    height: 125,
    padding: 5,
    backgroundColor: "#f1f1f1",
    margin: 5,
    marginRight: 10,
    borderRadius: 7,
  },
});
