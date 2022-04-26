import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import React from "react";
import theme from "../../../theme/AppTheme";

import SearchField from "../../../components/SearchField";
import LocationSelect from "../../../components/LocationSelect";
import KitchenSliderContainer from "../../../components/kitchenSlider/KitchenSliderContainer";

const { secondary, text } = theme.colors;

const Home = () => {
  return (
    <ScrollView style={styles.root}>
      {/* Location Container */}
      <LocationSelect />
      {/* Location Container */}

      {/* Hero Text Container*/}
      <View style={styles.heroTextContainer}>
        <Text style={styles.heroText2}>Order Food Online from the </Text>
        <Text style={styles.heroText1}>Best Homecook</Text>
      </View>
      {/* Hero Text Container*/}
      {/* Search Bar Container */}
      <SearchField />
      {/* Search Bar Container */}
      {/* Kitchen Slider Container */}
      <KitchenSliderContainer />
      {/* Kitchen Slider Container */}
      {/* Kitchen Slider Container */}
      <KitchenSliderContainer />
      {/* Kitchen Slider Container */}
      {/* Kitchen Slider Container */}
      <KitchenSliderContainer />
      {/* Kitchen Slider Container */}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    width: theme.SIZES.width,
    backgroundColor: "#f6f6f6",
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    paddingHorizontal: 16,
  },
  heroTextContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  heroText1: {
    fontSize: 30,
    color: secondary,
    fontWeight: "bold",
  },
  heroText2: {
    fontSize: 22,
    color: text,
    fontWeight: "bold",
  },
});
