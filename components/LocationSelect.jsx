import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import theme, { colors } from "../theme/AppTheme";
import { MaterialIcons, Ionicons } from "react-native-vector-icons";

const { darkgray, primary, text } = theme.colors;

const LocationSelect = () => {
  return (
    <View style={styles.locationSelectContainer}>
      <View>
        <Pressable
          onPress={() => console.log("pressed")}
          android_ripple={{ color: "#ccc" }}
          style={styles.locationSelect}
        >
          <MaterialIcons
            name="location-on"
            size={30}
            color={primary}
            style={styles.locationIcon}
          />
          <View>
            <Text style={styles.locationTitle}>Current Location</Text>
            <Text style={styles.locationContent}>
              142B, Ram Nagar, Coimbatore...
            </Text>
          </View>
          <MaterialIcons
            style={styles.locationDropdownIcon}
            name="keyboard-arrow-down"
            size={30}
            color={darkgray}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default LocationSelect;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
  },
  locationSelectContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  locationSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationIcon: {
    padding: 0,
    paddingRight: 7,
  },
  locationDropdownIcon: {
    paddingLeft: 7,
  },
  locationTitle: {
    fontSize: 11,
    textTransform: "uppercase",
    color: darkgray,
    fontWeight: "bold",
  },
  locationContent: {
    fontSize: 14,
    color: text,
  },
  locationText: {
    minWidth: theme.SIZES.width / 3,
    fontSize: 16,
    color: text,
    padding: 4,
  },
  notifyIcon: {
    padding: 4,
  },
});
