import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { forwardRef } from "react";
import { MaterialIcons, Fontisto, Ionicons } from "react-native-vector-icons";
import theme from "../theme/AppTheme";
import { useState } from "react";

const { colors, SIZES } = theme;

const KitchenSliderItem = ({ item, index }) => {
  const [liked, setLiked] = useState(false);
  const handleScroll = () => {
    console.log("pressed");
  };
  return (
    <View>
      <Pressable
        style={[styles.sliderItem, index === 0 && { marginLeft: 10 }]}
        onPress={handleScroll}
        android_ripple={{ color: "#ccc", foreground: true }}
      >
        <Pressable
          onPress={() => setLiked((liked) => !liked)}
          style={({ pressed }) => [
            styles.favoritesIcon,
            pressed && { backgroundColor: "#6666662f" },
          ]}
        >
          <Ionicons
            name={"ios-heart-sharp"}
            size={25}
            color={liked ? colors.primary : colors.darkLight}
          />
        </Pressable>
        <View style={styles.wrapper}>
          <Image
            style={styles.image}
            source={{
              uri: item.image,
            }}
          />
          <View style={styles.content}>
            <Text style={styles.kitchenHeader}>{item.kitchen_name}</Text>
            <View style={styles.infoContainer}>
              <Fontisto
                name="stopwatch"
                size={20}
                color={colors.darkgray}
                style={styles.locationIcon}
              />
              <Text style={styles.infoContent}>Breakfast, Lunch, Dinner</Text>
            </View>
            <View style={styles.infoContainer}>
              <MaterialIcons
                name="location-on"
                size={20}
                color={colors.darkgray}
                style={styles.locationIcon}
              />
              <Text style={styles.infoContent}>
                {item.city} - {item.distance}
              </Text>
            </View>

            <View style={styles.ratingContainer}>
              {[...Array(3)].map((item, index) => {
                return (
                  <MaterialIcons
                    name="star"
                    key={index}
                    size={15}
                    color={colors.secondary}
                    style={styles.ratingIcon}
                  />
                );
              })}
              <Text style={styles.ratingText}>(300)</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default KitchenSliderItem;

const styles = StyleSheet.create({
  sliderItem: {
    backgroundColor: "#fff",
    width: 340,
    minHeight: SIZES.width / 3,
    borderRadius: 7,
    elevation: 4,
    zIndex: 2,
    overflow: "hidden",
    padding: 5,
    borderWidth: 1,
    borderColor: "#e9e9e9",
    margin: 7,
  },
  image: {
    width: "40%",
    height: "100%",
    resizeMode: "cover",
    zIndex: 1,
    borderRadius: 7,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
  content: {
    padding: 10,
  },
  kitchenHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  locationIcon: {
    paddingRight: 5,
  },
  infoContent: {
    fontSize: 14,
    color: colors.gray,
  },
  ratingText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  favoritesIcon: {
    position: "absolute",
    zIndex: 5,
    top: 4,
    right: 4,
    padding: 4,
    borderRadius: 50,
  },
});
