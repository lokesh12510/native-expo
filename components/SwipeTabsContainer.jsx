import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SwipeTabsItem from "./SwipeTabsItem";
import theme, { colors, SIZES } from "../theme/AppTheme";

const Tab = createMaterialTopTabNavigator();

const SwipeTabsContainer = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        style={styles.tabContainer}
        screenOptions={{
          tabBarItemStyle: { width: "auto", paddingHorizontal: 15 },
          tabBarScrollEnabled: true,
          tabBarBounces: true,
          tabBarStyle: { backgroundColor: "#fff", elevation: 0 },
          tabBarIndicatorStyle: { backgroundColor: colors.primary },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
        }}
      >
        <Tab.Screen name="Recommended" component={SwipeTabsItem} />
        <Tab.Screen name="Featured" component={SwipeTabsItem} />
        <Tab.Screen name="Non-Veg" component={SwipeTabsItem} />
        <Tab.Screen name="Veg" component={SwipeTabsItem} />
        <Tab.Screen name="Biriyani" component={SwipeTabsItem} />
      </Tab.Navigator>
    </View>
  );
};

export default SwipeTabsContainer;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  tabContainer: {
    height: SIZES.height - 45,
    flex: 1,
    overflow: "visible",
  },
});
