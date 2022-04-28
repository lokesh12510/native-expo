import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import theme from "../theme/AppTheme";
import AppImages from "../constants/Images";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialIcons,
  Entypo,
  Ionicons,
  Fontisto,
  MaterialCommunityIcons,
} from "react-native-vector-icons";

const { colors, SIZES } = theme;

const SpecialOffersSliderItem = ({ item, index }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable
      onPress={() => console.log("pressed!")}
      style={[styles.sliderItem, index === 0 && { marginLeft: 10 }]}
      android_ripple={{ color: "#fff", foreground: true }}
    >
      <ImageBackground style={styles.image} source={{ uri: item.image }}>
        <LinearGradient
          colors={["#00000000", "#000000"]}
          style={styles.overlay}
        >
          <Pressable
            onPress={() => setLiked((liked) => !liked)}
            style={({ pressed }) => [
              styles.favoritesIcon,
              pressed && { backgroundColor: "#f1f1f111" },
            ]}
          >
            <Ionicons
              name={liked ? "ios-heart-sharp" : "ios-heart-outline"}
              size={25}
              color={liked ? colors.primary : colors.white}
            />
          </Pressable>
          <View style={styles.content}>
            <View style={styles.ratingContainer}>
              {[...Array(item.rating)].map((item, index) => {
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
              {/* <Text style={styles.contentText}>(300)</Text> */}
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.sliderTitle}>{item.kitchen_name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.contentText, { fontSize: 12 }]}>
                Breakfast, Lunch, Dinner
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <MaterialCommunityIcons
                name="sale"
                size={35}
                color={colors.secondary}
                style={styles.shopIcon}
              />
              <Text
                style={[
                  styles.sliderTitle,
                  { fontSize: 40, color: colors.secondary },
                ]}
              >
                {item.discount}%
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <MaterialIcons
                name="location-on"
                size={16}
                color={colors.white}
                style={styles.locationIcon}
              />
              <Text style={styles.contentText}>{item.city}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

export default SpecialOffersSliderItem;

const styles = StyleSheet.create({
  sliderItem: {
    width: 210,
    height: 280,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 7,
    marginRight: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  content: {
    padding: 10,
  },
  sliderTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  contentText: {
    color: "#fff",
    fontSize: 14,
  },
  shopIcon: {
    marginRight: 7,
  },
  locationIcon: {
    marginRight: 7,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
  },
  favoritesIcon: {
    position: "absolute",
    zIndex: 3,
    top: 4,
    right: 4,
    padding: 7,
    borderRadius: 50,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
  },
});
