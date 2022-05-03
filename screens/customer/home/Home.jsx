import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  SectionList,
  SafeAreaView,
} from "react-native";
import React from "react";
import theme from "../../../theme/AppTheme";

import SearchField from "../../../components/SearchField";
import HSliderContainer from "../../../components/HSliderContainer";
import KitchenSliderItem from "../../../components/KitchenSliderItem";
import MainCategory from "../../../components/MainCategory";
import FloatingCart from "../../../components/FloatingCart";
import { useSelector } from "react-redux";
import SwipeTabsItem from "../../../components/SwipeTabsItem";
import KitchenList from "../../../components/Kitchen/KitchenList";
import FoodCategory from "../../../components/foodCategory/FoodCategory";
import FoodList from "../../../components/foodList/FoodListContainer";

const { colors } = theme;

const Home = () => {
  const { cartItemsCount } = useSelector((state) => state.cart);
  const { profile } = useSelector((state) => state.user);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView nestedScrollEnabled={true}>
        {/* Hero Text Container*/}
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroText1}>Hi, {profile?.name}</Text>
          <Text style={styles.heroText2}>
            Order Food Online from the best Homecook
          </Text>
        </View>
        {/* Hero Text Container*/}

        {/* Kitchen Slider  */}
        <KitchenList />
        {/* Kitchen Slider  */}
        {/* Food Category Container */}
        <FoodCategory />
        {/* Food Category Container */}

        {/* Food Items Container */}
        <FoodList />
        {/* Food Items Container */}
      </ScrollView>
      {/* Floating Cart View */}
      {cartItemsCount > 0 && <FloatingCart />}
      {/* Floating Cart View */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: theme.SIZES.width,
    backgroundColor: "#fff",
    position: "relative",
  },
  container: {
    paddingHorizontal: 16,
  },
  heroTextContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  heroText1: {
    fontSize: 25,
    color: colors.secondary,
    fontWeight: "bold",
    marginBottom: 7,
  },
  heroText2: {
    fontSize: 16,
    color: colors.darkLight,
    fontWeight: "bold",
  },
});
