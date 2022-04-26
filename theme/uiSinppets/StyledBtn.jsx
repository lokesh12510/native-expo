import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import theme from "../AppTheme";

export default function StyledBtn(props) {
  const { onPress, title = "Save" } = props;
  return (
    <View>
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        onPress={onPress}
        android_ripple={"#000"}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    color: "#fff",
    backgroundColor: theme.colors.primary,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textTransform: "uppercase",
  },
  pressed: {
    opacity: 0.8,
    elevation: 8,
  },
});
