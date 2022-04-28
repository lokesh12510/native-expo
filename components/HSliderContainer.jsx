import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import React from "react";
import theme from "../theme/AppTheme";
import { LinearGradient } from "expo-linear-gradient";

const { colors, SIZES } = theme;

const HSliderContainer = ({ sectionTitle, children, bg }) => {
  return (
    <>
      <LinearGradient colors={["#ffffff", colors.secondary]}>
        <View
          style={[
            styles.sliderContainer,
            { backgroundColor: bg ? bg : "#fff" },
          ]}
        >
          <View style={styles.sectionTitleContainer}>
            <Text style={[styles.sectionTitle]}>{sectionTitle}</Text>
          </View>
          <View style={styles.sliderItemContainer}>{children}</View>
        </View>
      </LinearGradient>
    </>
  );
};

export default HSliderContainer;

const styles = StyleSheet.create({
  sliderContainer: {
    paddingVertical: 15,
  },
  sectionTitleContainer: {
    paddingVertical: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
    marginLeft: 10,
    textTransform: "uppercase",
  },
  sliderItemContainer: {
    width: SIZES.width,
    marginVertical: 5,
  },
});
