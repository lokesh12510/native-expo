import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import theme from "../../theme/AppTheme";
import { MaterialIcons, Fontisto } from "react-native-vector-icons";

const { colors, SIZES } = theme;

const KitchenSliderItem = ({ item }) => {
  return (
    <View>
      <Pressable
        style={styles.sliderItem}
        onPress={() => console.log("pressed")}
        android_ripple={{ color: "#ccc" }}
      >
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
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: "#fff",
    width: SIZES.width / 1.3,
    minHeight: SIZES.width / 3,
    borderRadius: 7,
    elevation: 1,
    zIndex: 2,
    overflow: "hidden",
  },
  image: {
    width: "40%",
    height: "100%",
    resizeMode: "cover",
    zIndex: 1,
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
});