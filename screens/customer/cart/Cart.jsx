import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import React from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addItem, removeItem } from "../../../app/slices/cartSlice";
import StyledBtn from "../../../theme/uiSinppets/StyledBtn";
import theme from "../../../theme/AppTheme";

const Cart = () => {
  const { cartItems, cartItemsCount, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  return (
    <>
      <View
        style={{
          padding: 10,
          paddingHorizontal: 16,
          backgroundColor: theme.colors.secondary,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Item Count : {cartItemsCount}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Grand Total : {cartTotalAmount}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {cartItems.map((item, index) => {
          return <CartItem key={index} item={item} />;
        })}
      </ScrollView>
      <View style={{ bottom: -6, paddingHorizontal: 10, paddingVertical: 5 }}>
        <StyledBtn
          title={`Confirm Order (₹ ${cartTotalAmount})`}
          onPress={() => console.log("first")}
        />
      </View>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
