import { View, Text, ScrollView } from "react-native";
import React from "react";
import SwipeTabsContainer from "../../../components/SwipeTabsContainer";
import { FoodItem } from "../../../components/SwipeTabsItem";

const Cart = () => {
  return (
    <>
      {/* Swipe Tabs Container */}
      <ScrollView>
        <SwipeTabsContainer />

        {[...Array(6)].map((item, index) => {
          return <FoodItem key={index} />;
        })}
      </ScrollView>
      {/* Swipe Tabs Container */}
    </>
  );
};

export default Cart;
