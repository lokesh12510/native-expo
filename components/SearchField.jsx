import { View, StyleSheet, Pressable, TextInput, Text } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import theme from "../theme/AppTheme";

const { darkgray, secondary, black } = theme.colors;

const SearchField = () => {
  return (
    <View style={styles.searchBarContainer}>
      <Pressable style={styles.searchBar} android_ripple={{ color: "#ccc" }}>
        <MaterialIcons
          style={styles.searchIcon}
          name="search"
          size={20}
          color={darkgray}
        />
        <Text style={styles.searchTextField}>Search Food...</Text>
      </Pressable>
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingHorizontal: 13,
    marginVertical: 10,
  },
  searchBar: {
    backgroundColor: "#f6f6f6",
    color: black,
    borderRadius: 50,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  searchBarActive: {
    borderColor: secondary,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  searchTextField: {
    height: 30,
    color: darkgray,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
});
