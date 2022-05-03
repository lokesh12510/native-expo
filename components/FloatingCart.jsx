import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { colors } from "../theme/AppTheme";
import { AntDesign, Ionicons, MaterialIcons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../constants/routes";
import { useSelector } from "react-redux";

const FloatingCart = () => {
  const navigation = useNavigation();
  const { cartItemsCount, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign name="shoppingcart" size={30} color={colors.white} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.subTitle}>Total Amount</Text>
          <Text style={styles.sectionTitle}>
            &#x20B9; {cartTotalAmount}{" "}
            <Text style={styles.itemCount}>| {cartItemsCount} Items</Text>
          </Text>
        </View>
      </View>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate(Routes.customer.cart)}
        android_ripple={{ color: "#ccc" }}
      >
        <View style={styles.cartBtn}>
          <Text style={[styles.itemCount, { color: colors.primary }]}>
            View Cart
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={25}
            color={colors.primary}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default FloatingCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: colors.primary,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 11,
    color: colors.lightGray4,
  },
  itemCount: {
    fontSize: 14,
    color: colors.white,
  },
  cartBtn: {
    paddingLeft: 10,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
