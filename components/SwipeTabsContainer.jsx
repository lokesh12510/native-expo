import {
  Animated,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { MaterialIcons, Ionicons } from "react-native-vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SwipeTabsItem from "./SwipeTabsItem";
import theme from "../theme/AppTheme";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Profile from "../screens/customer/profile/Profile";

const HEADER_HEIGHT = 200;

const { colors, SIZES } = theme;

const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={{ opacity }}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const SwipeTabsContainer = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.selectedKitchenContainer]}>
        <View style={styles.kitchenImageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: "https://media.easemytrip.com/media/Blog/India/636977607425696252/636977607425696252QYiiUU.jpg",
            }}
          />
        </View>
        <View style={styles.kitchenContent}>
          <Text style={styles.kitchenTitle}>The New View</Text>
          <Text style={styles.subTitle}>Coimbatore</Text>
        </View>
        <View style={styles.IconBtn}>
          <Pressable
            android_ripple={{ color: "#ccc", borderLess: true }}
            style={{ padding: 1 }}
          >
            <MaterialIcons
              name="close"
              size={30}
              color={colors.black}
              style={styles.closeIcon}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <Tab.Navigator
          tabBar={(props) => <MyTabBar {...props} />}
          style={[styles.tabContainer, { overflow: "visible" }]}
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
          <Tab.Screen name="Recommended" component={Profile} />
          <Tab.Screen name="Featured" component={SwipeTabsItem} />
          <Tab.Screen name="Non-Veg" component={SwipeTabsItem} />
          <Tab.Screen name="Veg" component={SwipeTabsItem} />
          <Tab.Screen name="Biriyani" component={SwipeTabsItem} />
        </Tab.Navigator>
      </View>
    </>
  );
};

export default SwipeTabsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
  },
  selectedKitchenContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kitchenImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    elevation: 8,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  tabContainer: {
    paddingHorizontal: 16,
    flex: 1,
    // flexDirection: "column",
    // height: 400,
    // height: SIZES.height - 45,
  },
  kitchenContent: {
    paddingHorizontal: 10,
    flex: 2,
  },
  kitchenTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
    color: colors.black,
  },
  subTitle: {
    fontSize: 14,
    color: colors.black,
  },
  IconBtn: {
    margin: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
