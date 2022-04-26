import { View, StyleSheet, Pressable, TextInput, Text } from "react-native";
import React from "react";
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
        <Text style={styles.searchTextField}>Search Food or Cook...</Text>
      </Pressable>
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  searchBar: {
    backgroundColor: "#fff",
    color: black,
    borderRadius: 50,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 1,
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